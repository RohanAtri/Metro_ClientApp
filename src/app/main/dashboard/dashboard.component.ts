
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, HostBinding, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoleFunctions } from 'src/app/shared/constants/shared.enums';
import { FieldsValue } from 'src/app/shared/shared.model';
import { LimitAndQuotaTable } from '../limt-quota/models/limit-quota-interface';
import { dashboardConstant } from './constant/dashboard.constant';
import { DashboardApiService } from './dashboard-api.service';
import { DashboardDropdownData } from './models/dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  @HostBinding('class') class = 'd-flex flex-column h-100 overflow-hidden';

  @ViewChild('tableHead') tableHead!: ElementRef<HTMLElement>;
  @ViewChild('tableBody') tableBody!: ElementRef<HTMLElement>;
  @ViewChild('tableFoot') tableFoot!: ElementRef<HTMLElement>;

  dataNotFoundMsg: string;
  updateCurrentPageNumber: number;
  errorMessage: string;
  tableData: LimitAndQuotaTable;

  fAccess: any;

  dataRecords: any[];
  tableHeaderHeight: any;
  tableBodyHeight: any;
  headerTotal: any[]
  scrollXPosition: any;
  scrollYPosition: any;
  noDataFound: boolean;
  headers: any;

  filters: any = {
    fcompanyId: null,
    fgenderId: null,
    fcategoryId: null,
    fsubcategoryId: null,
    fagId: null,
    fbrandtypeId: null,
    fbrandnameId: null,
    companyId: null,
    genderId: null,
    categoryId: null,
    subcategoryId: null,
    agId: null,
    brandtypeId: null,
    brandnameId: null,
    periodId: null
  };
  constructor(private dashboardApiService: DashboardApiService, private cd: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit(): void {
    // this.dependentDropdownList = dashboardConstant.dependentDropdownList;
    this.getDropdownLits();
    this.getData();
    this.fAccess = this.authService.getFunction(RoleFunctions.Distribution);

  }

  dropdownList: DashboardDropdownData[];
  /**
   * API:- LIST FOR FILTERS DROPDOWN
   */
  getDropdownLits() {
    const service = this.dashboardApiService as any;
    this.dropdownList = dashboardConstant.allShowroomDropDownData();
    for (let i = 0; i < dashboardConstant.allShowroomDropDownData().length; i++) {
      service['getAllMaster'](dashboardConstant.allShowroomDropDownData()[i].path).subscribe((res: any) => {
        this.dropdownList[i].data = [...res];
      });
    }
  }

  getData() {
    this.noDataFound = true;
    this.dashboardApiService.getListFilter(this.filters).subscribe(
      (response) => {
        this.tableData = response;
        this.dataRecords = this.tableData.data;
        this.noDataFound = false;
        this.cd.detectChanges();
      }, (error) => {
        (error);
        this.noDataFound = false;
      }
    );
  }

  theadScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableBody?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
  }

  tbodyScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableHead?.nativeElement;
    let tfoot: HTMLElement = this.tableFoot?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
    tfoot.scroll(this.scrollXPosition, 0);
  }

  isNumber(val: any): boolean { return typeof val === 'number'; }

  dependentDropdownList: DashboardDropdownData[];

  // appendListToDropdown(key: any, res: any) {
  //   dashboardConstant.dependentDropdownList = dashboardConstant.dependentDropdownList.map(
  //     (x: DashboardDropdownData) => {
  //       if (x.path == key.id) {
  //         x.data = [...res];
  //       }
  //       return x;
  //     });
  // }

  // changedKey(key: FieldsValue) {
  //   // if (key.id) {
  //   this.dashboardApiService.getAllMaster(`api/referencedata/${key.id}/${key.name}`).subscribe((res) => {
  //     this.appendListToDropdown(key, res);
  //   }, (error) => {
  //     this.appendListToDropdown(key, []);
  //   });
  //   //this.dependentDropdownList = dashboardConstant.dependentDropdownList;
  //   // }
  // }

  getDistributionByFilters(path: any, filter: any) {
    //this.pageNumber = 1;
    // this.defaultFilter = filter.filters;
    // const tableFilter: TableOption = this.setTableFilter(this.pageNumber, this.recordPerPage);
    // this.getDistributionTableRecords(filter.filters, tableFilter);
    const data = filter.filters;
    this.filters.fcompanyId = data.companyId?.length == 0 ? null : data.companyId?.join(',');
    this.filters.fgenderId = data.genderId?.length == 0 ? null : data.genderId?.join(',');
    this.filters.fbrandtypeId = data.brandtypeId?.length == 0 ? null : data.brandtypeId?.join(',');
    this.filters.fcategoryId = data.categoryId?.length == 0 ? null : data.categoryId?.join(',');
    this.filters.fsubcategoryId = data.subcategoryId?.length == 0 ? null : data.subcategoryId?.join(',');
    this.filters.fagId = data.agId?.length == 0 ? null : data.agId?.join(',');
    this.filters.fbrandnameId = data.brandnameId?.length == 0 ? null : data.fbrandnameId?.join(',');
    this.filters.periodId = data.periodId?.length == 0 ? null : data.periodId?.join(',');
    this.filters.companyId = null;
    this.filters.genderId = null;
    this.filters.brandtypeId = null;
    this.filters.categoryId = null;
    this.filters.subcategoryId = null;
    this.filters.agId = null;
    this.filters.brandnameId = null;

    this.noDataFound = true;
    this.dashboardApiService.getListFilter(this.filters).subscribe(
      (response) => {
        this.tableData = response;
        this.dataRecords = this.tableData.data;
        this.noDataFound = false;
        this.cd.detectChanges();
      }, (error) => {
        (error);
        this.noDataFound = false;
      }
    );
  }

  expand(rowIndex: number, colIndex: number, data: any, col: any) {
    let nameKey = col?.propName.replace('Name', 'Id');

    this.filters.companyId = data.companyId;
    this.filters.genderId = data.genderId;
    this.filters.brandtypeId = data.brandtypeId;
    this.filters.categoryId = data.categoryId;
    this.filters.subcategoryId = data.subcategoryId;
    this.filters.agId = data.agId;
    this.filters.brandnameId = data.brandnameId;
    this.filters.periodId = this.filters.periodId;

    const nameKeyTg = `Tg_${colIndex}`;
    this.tableData.data[rowIndex][nameKeyTg] = !this.tableData.data[rowIndex][nameKeyTg];

    const currentKey = this.tableData.data[rowIndex]['parent_'];
    const pNameKeyExp = currentKey ? `${currentKey}_parent_${rowIndex}` : `parent_${rowIndex}`;

    if (!this.tableData.data[rowIndex][nameKeyTg]) {
      const count = this.tableData.data.filter(x => x['parent_']?.indexOf(pNameKeyExp) == 0);
      this.tableData.data.splice(rowIndex + 1, count.length);
      return;
    }

    this.dashboardApiService.getListFilter(this.filters).subscribe(
      (response) => {
        const nameKeyExp = `${col?.propName}Exp`;
        const data = response?.data.map(function (ele: any) {
          ele['parent_'] = pNameKeyExp;
          // ele[nameKeyExp] = true;
          return ele;
        });

        this.tableData.data.splice(rowIndex + 1, 0, ...data);
        this.cd.detectChanges();
      }, (error) => {
        (error);
        this.noDataFound = false;
      });

  }

  showLakhs(value: boolean) {
    for (let i = 0; i < this.tableData?.header.length; i++) {
      console.log(this.tableData?.header[i].placeHolderName);
      this.tableData.header[i].placeHolderName = value
        ? this.tableData?.header[i].placeHolderName.replace("   ", "(L)")
        : this.tableData?.header[i].placeHolderName.replace("(L)", "   ");
    }
  }
}