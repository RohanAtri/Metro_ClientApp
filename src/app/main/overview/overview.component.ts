import { overviewFilters } from './model/overview.model';
import { TableOption } from './../limt-quota/models/limit-quota-interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, HostBinding, OnInit } from '@angular/core';
import { overView } from './constants/overview.contants';
import { OverviewService } from './services/overview.service';
import { PaginationOptions } from 'src/app/shared/shared.model';
import { HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceUploadsComponent } from '../distribution/reference-uploads/reference-uploads.component';
import { Model } from '../distribution/reference-uploads/model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @HostBinding('class') class = 'overflow-hidden';

  fAccess: any;
  errorMsg: string;
  tableData: any;
  backDays: number[];
  filterControls: FormGroup;
  currentPageNumber: number = 1;
  overviewFilter: overviewFilters;
  filters: any = {
    backDays: null,
    company: null,
    currentPage: 1,
    recordPerPage: 50
  }
  paginationControls: any

  constructor(private overviewService: OverviewService, private fb: FormBuilder, private modalService: NgbModal, private model: Model) { }

  ngOnInit(): void {
    this.backDays = overView.backDaysDropdown;
    this.filterControls = this.buildFilterControlForm();
    this.getTableData(this.filters);
  }

  buildFilterControlForm(): FormGroup {
    return this.fb.group({
      backDays: [],
      company: []
    });
  }

  getLimitAndQuotaRecords(filters: any) {
    this.overviewService.getOverviewList(filters).subscribe((res: any[]) => {
      this.tableData = res;
    });
  }

  getTableData(data: any) {
    this.paginationControls = data;
    this.filters = { ...data, ...this.filterControls.value };
    this.getLimitAndQuotaRecords(this.filters)
  }

  changeByBackDays(data: any) {
    this.filters = { ...this.paginationControls, ...this.filterControls.value };
    this.getLimitAndQuotaRecords(this.filters)
  }

  openUploadDialog_1(content: any) {
    const modal: NgbModalRef = this.modalService.open(content, { centered: true, size: 'sm' });
    (<ReferenceUploadsComponent>modal.componentInstance).data = 'overview';

    modal.result.then((result) => {
      // console.log(result);
    }, (reason) => {
      // console.log(reason);
    });
  }

  public openUploadDialog(content: any): void {
    this.model.name = 'overview';
    const modal: NgbModalRef = this.modalService.open(content, { backdrop: "static", centered: true, size: 'sm' });
    const modalComponent: ReferenceUploadsComponent = modal.componentInstance;

    modal.result.then(
      (result) => {
        this.updateBindings();
      },
      () => { });
  }

  public updateBindings(): void {

  }

  download() {

    let params: HttpParams = new HttpParams();

    // Object.keys(this.filterForm.value).forEach((key) => {
    //   if (this.filterForm.value[key] !== null) {
    //     params = params.set(`FilterOptions.${key}`, this.filterForm.value[key]);
    //   }
    // })

    // this.downloadData.emit(params);
  }

}
