import { LimitAndQuotaService } from '../../../main/limt-quota/services/limit-and-quota.service';
import { PaginationOptions } from '../../shared.model';
import { LimitAndQuotaTable, LimitAndQuotaHeaders } from '../../../main/limt-quota/models/limit-quota-interface';
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, HostBinding, EventEmitter, Output } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { sharedConstants } from '../../constants/constants';

@Component({
  selector: 'app-lqtable',
  templateUrl: './lqtable.component.html',
  styleUrls: ['./lqtable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LQTableComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column h-100 overflow-hidden';

  @ViewChild('tableHead') tableHead!: ElementRef<HTMLElement>;
  @ViewChild('tableBody') tableBody!: ElementRef<HTMLElement>;

  @Input() dataNotFoundMsg: string;
  @Input() updateCurrentPageNumber: number;
  @Input() errorMessage: string;
  @Input()
  public set tableData(v: LimitAndQuotaTable) {
    if (v && this.headerTotal) {
      this.tableRecords = v;
      if (this.activeTab == 2) {
        this.dataRecords = v.data && v.data.splice(1, this.tableRecords.data.length);
      } else {
        this.dataRecords = v.data

      }

      setTimeout(() => {
        this.tableHeaderHeight = document.getElementById('theadTable')?.clientHeight;
        this.tableBodyHeight = document.getElementById('tableBody')?.clientHeight;
        this.cd.detectChanges();
      }, 0);
      this.noDataFound = false;
    }

    else {
      this.noDataFound = true;
      this.tableRecords = v;
      this.headerTotal = [];
    }
  }

  public get tableData(): any {
    return this.tableRecords;
  }


  @Input() access: any;
  @Input() activeTab: number;
  @Input() isPaginatedTable: boolean = true;
  @Output() currentPageNumber: EventEmitter<PaginationOptions> = new EventEmitter<PaginationOptions>();
  @Output() totalValues: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataLock: any;

  dataRecords: any[];
  tableHeaderHeight: any;
  tableBodyHeight: any;
  tableRecords: LimitAndQuotaTable;
  headerTotal: any[]
  scrollXPosition: any;
  noDataFound: boolean;
  recordPerPage: number;
  headers: any;

  constructor(private toastService: ToastService, private cd: ChangeDetectorRef, private limitAndQuotaService: LimitAndQuotaService) {
    this.recordPerPage = sharedConstants.pageSizeOption[1];;
   }

  ngOnInit(): void {
    this.getHeaderRow();
  }

  getHeaderRow() {
    this.limitAndQuotaService.getHeaderRow().subscribe((res) => {
      this.headers = res.headerRow && res.headerRow.map((x: any) => {
        return res.tableData.header.map((x1: any) => {
          return x[x1.propName];
        });
      });
      this.cd.detectChanges();
    });
  }

  ngOnChanges(value: any) {
    if (value.currentValue) {
      this.tableHeaderHeight = document.getElementById('theadTable')?.clientHeight;
      this.tableBodyHeight = document.getElementById('tableBody')?.clientHeight;
    }
  }

  tbodyScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableHead?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
  }

  theadScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableBody?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
  }

  getTableData(currentPageNumber: PaginationOptions) {
    this.currentPageNumber.emit(currentPageNumber);
  }

  saveLimitAndQuotaAmount(rowData: any, propName: string) {
    if(this.headers.length == 3){
      const post = this.tableData?.header?.find((x: any) => x.propName == propName);
      const index = this.tableData?.header?.indexOf(post)
      const headerBalancerow: any = this.headers[2];
      const newBalance = (headerBalancerow[index] + rowData['old' + propName]) - rowData[propName]
      if (newBalance < 0) {
        this.toastService.show("value should not exceed total allowed limit/quota", { classname: 'bg-danger text-light', delay: 3000 });
        const dataindex = this.dataRecords.indexOf(rowData);
        this.dataRecords[dataindex][propName] = rowData['old' + propName];
        return;
      }
    }
    

    let requestObj: any = {
      companyId: 0,
      genderId: 0,
      categoryId: 0,
      subcategoryId: 0,
      agId: 0,
      brandtypeId: 0,
      brandnameId: 0,
      periodId: 0,
      id: 0,
      showroomId: 0,
      limit: 0,
      quota: 0
    };
    for (const key in requestObj) {
      if (Object.keys(rowData).includes(key)) {
        requestObj[key] = rowData[key];
      }
    }

    this.totalValues.emit({ requestObj, propName });
  }
}
