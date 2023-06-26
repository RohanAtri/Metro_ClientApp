import { LimitAndQuotaService } from './services/limit-and-quota.service';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaginationOptions } from './../../shared/shared.model';
import { FilterControls, LimitAndQuotaTable, LimitQuotaDropdownData, TableOption, LimitAndQuotaHeaders, FieldsValue } from './models/limit-quota-interface';
import { LimitAndQuotaApiService } from './services/limit-and-quota-api.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { limitQuota } from './constants/limit-quota.constants';
import { LimitAndQuotaTablePath } from './constants/limit-quota.enums';
import { RoleFunctions } from 'src/app/shared/constants/shared.enums';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams } from '@angular/common/http';
import { DistributionPath } from '../distribution/constant/distribution.enums';
import { ToastService } from 'src/app/shared/services/toast.service';
import { sharedConstants } from 'src/app/shared/constants/constants';
@Component({
  selector: 'app-limit-quota',
  templateUrl: './limit-quota.component.html',
  styleUrls: ['./limit-quota.component.scss']
})
export class LimitQuotaComponent implements OnInit {

  @HostBinding('class') class = 'd-flex flex-column h-100 overflow-hidden';

  dropdownList: LimitQuotaDropdownData[];
  activeTab: number;
  tableData: LimitAndQuotaTable;
  dataNotFoundMsg: string;
  filterOptions: any = limitQuota.filter;
  tabChangeEvent: any;
  recordPerPage: number = sharedConstants.pageSizeOption[1];
  pageNumber: number = 1;
  tableOption: TableOption;
  resetDropdownFilters: boolean;
  tableHeader: LimitAndQuotaHeaders[];
  errorMsg: string;
  fAccess: any;
  dataLocked: any;
  showOption: boolean = true;
  dependentDropdownList: LimitQuotaDropdownData[];

  constructor(private limitAndQuotaApiService: LimitAndQuotaApiService, private toastService: ToastService,
    private limitAndQuotaService: LimitAndQuotaService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.dependentDropdownList = limitQuota.dependentDropdownList;
    this.recordPerPage = sharedConstants.pageSizeOption[1];
    this.getDropdownLits();
    // this.getLimitAndQuotaRecords(limitQuota.tabChangeEvent, this.filterOptions, this.setTableFilter(this.pageNumber, this.recordPerPage));
    this.fAccess = this.authService.getFunction(RoleFunctions.LimitAndQuota);
    this.fAccess.update_limit = this.authService.getFunction(RoleFunctions.LimitAndQuotaLimit)?.update;
    this.fAccess.update_quota = this.authService.getFunction(RoleFunctions.LimitAndQuotaQuota)?.update;
  }

  getDropdownLits() {
    const service = this.limitAndQuotaApiService as any;
    this.dropdownList = limitQuota.getLimitQuotaDropDownData();
    for (let i = 0; i < limitQuota.getLimitQuotaDropDownData().length; i++) {
      service['getList'](limitQuota.getLimitQuotaDropDownData()[i].path).subscribe((res: any) => {
        this.dropdownList[i].data = [...res];
      });
    }
  }

  
  changedKey(key: FieldsValue) {
    // if (key.id) {
    this.limitAndQuotaApiService.getAllMaster(`api/referencedata/${key.id}/${key.name}`).subscribe((res) => {
      this.appendListToDropdown(key, res);
    }, (error) => {
      this.appendListToDropdown(key, []);
    });
    //this.dependentDropdownList = limitQuota.dependentDropdownList;
    // }
  }
  
  appendListToDropdown(key: any, res: any) {
    limitQuota.dependentDropdownList = limitQuota.dependentDropdownList.map(
      (x: LimitQuotaDropdownData) => {
        if (x.path == key.id) {
          x.data = [...res];
        }
        return x;
      });
  }

  resetFilters(activeTab: any, filterOptions: any, tableOptions: TableOption) {
    this.showOption = true;
    filterOptions = limitQuota.filter;
    tableOptions = limitQuota.paginationControls;
    this.resetDropdownFilters = true;
    // this.getLimitAndQuotaRecords(activeTab, filterOptions, tableOptions);
  }


  filterTable(activeTab: FilterControls, filterOptions: FilterControls) {
    this.filterOptions = filterOptions.filters;
    this.pageNumber = 1;
    const tableFilter: TableOption = this.setTableFilter(this.pageNumber,  this.recordPerPage);
    this.getLimitAndQuotaRecords(activeTab, filterOptions.filters, tableFilter);
  }

  /**
   * When pagination is changed.
   */
  getTableData(currentPageNumber: PaginationOptions) {
    const controls = {
      nextId: this.activeTab
    };
    const tableFilter: TableOption = this.setTableFilter(currentPageNumber.currentPage, currentPageNumber.recordPerPage);
    this.getLimitAndQuotaRecords(controls, this.filterOptions, tableFilter);
  }

  setTableFilter(pageNumber: number, recordPerPage: number): TableOption {
    this.pageNumber = pageNumber;
    this.recordPerPage = recordPerPage;
    this.tableOption = {
      pageNo: pageNumber,
      pageSize: recordPerPage,
      sortColumn: "name",
      sortOrder: "desc"
    }
    return this.tableOption;
  }

  getObeservable(path: string, option: any): Observable<any> {
    return this.limitAndQuotaApiService.getListFilter(path, option);
  }

  getLimitAndQuotaRecords(activeTab: any, filterOptions: any, tableOptions: TableOption) {
    const path: string = activeTab.nextId === 1 ? LimitAndQuotaTablePath.CATEGORY : LimitAndQuotaTablePath.COMPANY;
    const headerPath: string = activeTab.nextId === 1 ? LimitAndQuotaTablePath.CATEGORYHEADER : LimitAndQuotaTablePath.COMPANYHEADER;

    const gridData: Observable<any> = this.getObeservable(path, { filterOptions, tableOptions });
    const headersData: Observable<any> = this.getObeservable(headerPath, { filterOptions, tableOptions });
    headersData.pipe(concatMap((header: LimitAndQuotaHeaders[]) => {
      this.tableHeader = header;
      return gridData
    })).subscribe((res: LimitAndQuotaTable) => {
      this.tableData = res;
      this.limitAndQuotaService.sendHeaderRow({ headerRow: this.tableHeader, tableData: this.tableData });
    }, (errorRes) => {
      this.errorMsg = errorRes.error;
    }
    );
  }

  summation(resp: any) {
    const data = resp.requestObj;

    const headerPath: string = this.activeTab === 1 ? LimitAndQuotaTablePath.CATEGORYHEADER : LimitAndQuotaTablePath.COMPANYHEADER;
    const path: string = this.activeTab === 1 ? LimitAndQuotaTablePath.CATEGORY : LimitAndQuotaTablePath.COMPANY;
    const tableOptions = { filterOptions: this.filterOptions, tableOptions: this.setTableFilter(this.pageNumber, this.recordPerPage) }
    const headersData: Observable<any> = this.getObeservable(headerPath, tableOptions);

    this.limitAndQuotaApiService.updateSummation(path, data).pipe(concatMap((updatedData: any) => {
      return headersData
    })).subscribe((res: any) => {
      this.tableHeader = res;
      this.limitAndQuotaService.sendHeaderRow({ headerRow: this.tableHeader, tableData: this.tableData });
      this.toastService.show("Data saved successfully", { classname: 'bg-success text-white', delay: 3000 });

    }, (error) => {
      let er = "internal server error";
      this.toastService.show(er, { classname: 'bg-danger text-light', delay: 3000 });
    });
  }


  download(httpParams: HttpParams) {

    httpParams = httpParams.set(`TableOptions.SortColumn`, this.tableOption.sortColumn);
    httpParams = httpParams.set(`TableOptions.SortOrder`, this.tableOption.sortOrder);

    this.limitAndQuotaApiService.dowloadLimitsAndQouta(httpParams, this.activeTab === 1 ? LimitAndQuotaTablePath.DOWNLOAD_CATEGORY : LimitAndQuotaTablePath.DOWNLOAD_COMPANY);
  }

  checkDataLock(monthId: number) {
    this.limitAndQuotaApiService.checkDataLock(monthId).subscribe((resp) => {
      this.dataLocked = resp;
    }, (error) => {

    });
  }
}
