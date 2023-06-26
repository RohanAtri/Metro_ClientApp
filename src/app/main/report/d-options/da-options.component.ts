import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { DistributionPath } from 'src/app/main/distribution/constant/distribution.enums';
import { AuthService } from 'src/app/services/auth.service';
import { FieldsValue, FilterForm } from 'src/app/shared/shared.model';
import { DashboardDropdownData } from '../../dashboard/models/dashboard.model';

@Component({
  selector: 'app-da-options',
  templateUrl: './da-options.component.html',
  styleUrls: ['./da-options.component.scss']
})
export class DaOptionsComponent implements OnInit {

  // @ViewChild('content') private content: TemplateRef<any>;
  @ViewChild('subCategory') subCategory: NgSelectComponent;
  @ViewChild('agId') agId: NgSelectComponent;
  @ViewChild('brandName') brandName: NgSelectComponent;


  @Input() dropdownList: DashboardDropdownData[];
  @Input() dependentDropdownList: DashboardDropdownData[];
  @Input() access: any;


  @Output() filterData: EventEmitter<any> = new EventEmitter<any>();
  // @Output() downloadData: EventEmitter<HttpParams> = new EventEmitter<HttpParams>();
  @Output() changedKey: EventEmitter<FieldsValue> = new EventEmitter<FieldsValue>();

  filterForm: FormGroup;
  formOldValue: any;
  //ignoredFormKeys: string[] = ['companyId', 'genderId', 'brandtypeId', 'brandnameId', 'periodId'];
  selectedKey: string;
  public subscription = new Subscription();

  defaults: any = {
    companyId: null,
    genderId: null,
    categoryId: null,
    subcategoryId: null,
    agId: null,
    brandtypeId: null,
    brandnameId: null,
    periodId: null
  };

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private fb: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.buildFilterForm();
    this.formOldValue = { ...this.filterForm.value };
    this.authService.getDefaults().subscribe(
      (response: any) => {
        this.defaults = response;
        this.filterForm.patchValue({
          companyId: response?.companyId ? [response.companyId] : null,
          genderId: response?.genderId ? [response.genderId] : null,
          brandtypeId: response?.brandtypeId ? [response.brandtypeId] : null,
          categoryId: response?.categoryId ? [response.categoryId] : null,
          subcategoryId: response?.subcategoryId ? [response.subcategoryId] : null,
          agId: response?.agId ? [response.agId] : null,
          brandnameId: response?.brandnameId ? [response.brandnameId] : null,
          periodId: response?.periodId ? [response.periodId] : null
        });
        // this.cd.detectChanges();
        this.getDistributionByFilter();
      }, (error) => {

      }
    );
  }

  // dropdownControls() {
  //   this.filterForm.valueChanges.subscribe((res: FilterForm) => {
  //     //important operation @author JAY
  //     const key: string | undefined = Object.keys(res).find((k: string) => res[k as keyof typeof res] != this.formOldValue[k]);
  //     this.formOldValue = { ...this.filterForm.value };
  //     // if (key && !this.ignoredFormKeys.includes(key)) {
  //     this.getDropdownListById(key);
  //     // }

  //   });
  // }

  // getDropdownListById(changedKey: string | undefined) {
  //   if (changedKey) {
  //     //this.selectDropdownList(changedKey);
  //     const changedItem: FieldsValue = {
  //       id: this.selectedKey,
  //       name: this.filterForm.value[changedKey]
  //     };
  //     this.changedKey.emit(changedItem);
  //   }
  // }

  // selectDropdownList(changedKey: string) {
  //   switch (changedKey) {
  //     case 'categoryId':
  //       this.subCategory.handleClearClick();
  //       this.filterForm.controls.subCategory?.setValue(null);
  //       this.selectedKey = 'subCategory';
  //       break;
  //     case 'subcategoryId':
  //       this.agId.handleClearClick();
  //       this.selectedKey = 'ag';
  //       break;
  //     case 'agId':
  //       this.brandName.handleClearClick();
  //       this.selectedKey = 'brandName';
  //       break;
  //   }
  // }

  buildFilterForm() {
    this.filterForm = this.fb.group({
      companyId: [null],
      genderId: [null],
      brandtypeId: [null],
      categoryId: [null],
      subcategoryId: [null],
      agId: [null],
      brandnameId: [null],
      periodId: [null]
    });
  }

  getDistributionByFilter() {
    const filterControl = {
      path: DistributionPath.DISTRIBUTIONAPIPATH,
      filters: this.filterForm.value
    }
    this.filterData.emit(filterControl);
  }

  openUploadDialog(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  public get isValid() {
    return !this.filterForm.controls["companyId"].value === null && !this.filterForm.controls["genderId"].value && !this.filterForm.controls["brandtypeId"].value && !this.filterForm.controls["categoryId"].value && !this.filterForm.controls["periodId"].value;
  }
}

