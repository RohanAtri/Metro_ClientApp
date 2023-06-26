import { PaginationOptions } from './../../../shared/shared.model';
import { Distribution, DistributionTable, DistributionHeaders } from './../models/distribution.model';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectorRef, SimpleChange, EventEmitter, Output, HostBinding } from '@angular/core';
import { DistributionService } from '../services/distribution.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-d-table',
  templateUrl: './d-table.component.html',
  styleUrls: ['./d-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DTableComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column h-100 overflow-hidden';

  @ViewChild('tableHead') tableHead!: ElementRef<HTMLElement>;
  @ViewChild('theadTable') theadTable!: ElementRef<HTMLElement>;

  public scrollXPosition: any;
  public tableRecords: DistributionTable;
  public dataRecords: any[];
  public tableHeaderHeight: any;
  showroom: string;
  @Output() showLakhs: EventEmitter<any> = new EventEmitter<any>();
  @Input() errorMessage: string;
  @Input() updateCurrentPageNumber: number;
  @Input() access: any;
  @Input() dataLock: boolean;
  /**
   * grid Data
   */
  @Input()
  public set tableData(v: DistributionTable) {
    if (v?.header) {
      this.tableRecords = v;
      this.dataRecords = this.tableRecords.data;
      this.headerTotal = this.tableRecords.header;

      setTimeout(() => {
        this.tableHeaderHeight = document.getElementById('theadTable')?.clientHeight;
        this.cd.detectChanges();
      }, 0);
    }
  }
  public get tableData(): any {
    return this.tableRecords;
  }
  /**
   * table header total data
   */
  // @Input() set tableHeader(header: Distribution[]) {
  //   if (header) {
  //     this.headers = header;
  //   }
  // }
  // get tableHeader(): Distribution[] {
  //   return this.headers;
  // }


  @Output() currentPageNumber: EventEmitter<PaginationOptions> = new EventEmitter<PaginationOptions>();
  @Output() saveAmountData: EventEmitter<Distribution> = new EventEmitter<Distribution>();
  @Output() filterData: EventEmitter<any> = new EventEmitter<any>();

  searchRow: any[];
  utilisedRow: any[];
  headerTotal: DistributionHeaders[];
  headers: any;

  constructor(private toastService: ToastService, private cd: ChangeDetectorRef, private distributionService: DistributionService) { }

  ngOnChanges(value: SimpleChange) {
    if (value.currentValue) {
      this.tableHeaderHeight = document.getElementById('theadTable')?.clientHeight;
    }
    this.toggleshowLakhs();
  }

  ngOnInit(): void {
    this.getHeaderRow()
  }

  getHeaderRow() {
    this.distributionService.getHeaderRow().subscribe((res) => {
      this.headers = res.headerRow && res.headerRow.map((x: any) => {
        return res.tableData.header.map((x1: any) => {
          return {
            val: x[x1.propName],
            placeHolderName: x1.placeHolderName
          }
        });
      });
      // debugger
      // console.log(this.headers)
      this.searchRow = this.headers[0].splice(1, this.headers[0].length);
      this.cd.detectChanges();
    });
  }

  tbodyScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableHead?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
  }

  getTableData(currentPageNumber: PaginationOptions) {
    this.currentPageNumber.emit(currentPageNumber);
  }

  searchShowroom(event: any) {
    this.showroom = event;
    this.filterData.emit(this.showroom);
  }

  saveAmount(rowData: any, propName: string) {
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

    const shLevelData = rowData.showroom.substring(rowData.showroom.indexOf('(') + 1, rowData.showroom.indexOf(")"));
    const utlizedSh = (shLevelData?.split('/')[0])?.replace(/\s/g, '');
    const totalSh = (shLevelData?.split('/')[1])?.replace(/\s/g, '');

    if (shLevelData && utlizedSh && totalSh) {
      const balance = totalSh - utlizedSh;
      const newBalance = (balance + rowData['old' + propName]) - rowData[propName]
      if (newBalance < 0) {
        this.toastService.show("value should not exceed total allowed limit/quota", { classname: 'bg-danger text-light', delay: 3000 });
        const dataindex = this.dataRecords.indexOf(rowData);
        this.dataRecords[dataindex][propName] = rowData['old' + propName];
        return;
      } else {
        const filterData = this.tableData.data.filter((x: { company: string | any[]; }) => x.company?.indexOf(shLevelData) !== -1)
        const newused = (utlizedSh - rowData['old' + propName]) + rowData[propName]
        for (let index = 0; index < filterData.length; index++) {
          const idx = this.tableData.data.indexOf(filterData[index]);
          this.tableData.data[idx]['showroom'] = this.tableData.data[idx]['showroom'].replace(utlizedSh, newused.toString());
        }
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
        requestObj[key] = key != 'limit' && key != 'quota' ? parseFloat(rowData[key]) : rowData[key];
      }
    }
    this.saveAmountData.emit(requestObj)
  }


  toggleshowLakhs() {
    this.distributionService.getlakhsToggle().subscribe((value) => {
      //debugger;
      for (let i = 0; i < this.tableData?.header.length; i++) {
        this.tableData.header[i].placeHolderName = value
          ? this.tableData?.header[i].placeHolderName.replace("   ", "(L)")
          : this.tableData?.header[i].placeHolderName.replace("(L)", "   ");
      }
      for (let k = 0; k < this.headers.length; k++) {
        for (let i = 0; i < this.headers[k].length; i++) {
          this.tableData.header[i].placeHolderName = value
            ? this.headers[k][i].placeHolderName.replace("   ", "(L)")
            : this.headers[k][i].placeHolderName.replace("(L)", "   ");
        }
      }
       
      for (let i = 0; i < this.searchRow.length; i++) {
        this.searchRow[i].placeHolderName = value
          ? this.searchRow[i].placeHolderName.replace("   ", "(L)")
          : this.searchRow[i].placeHolderName.replace("(L)", "   ");
      }
      this.cd.detectChanges();
    }, (error) => {
      console.log(error);
    });

  }
}
