import { DistributionService } from './services/distribution.service';
import { concat, Observable } from 'rxjs';
import { TableOption } from './../limt-quota/models/limit-quota-interface';
import { DistributionPath } from './constant/distribution.enums';
import { FilterForm, PaginationOptions, FieldsValue } from './../../shared/shared.model';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { distributionConstant, DistributionConstants } from './constant/distribuutions.constant';
import { DistributionTable, DistributionDropdownData, Distribution } from './models/distribution.model';
import { DistributionApiService } from './services/distribution-api.service';
import { concatMap, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { RoleFunctions } from 'src/app/shared/constants/shared.enums';
import { HttpParams } from '@angular/common/http';
import { ToastService } from 'src/app/shared/services/toast.service';
import { sharedConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistributionComponent implements OnInit {

  @HostBinding('class') class = 'd-flex flex-column h-100 overflow-hidden';

  @Input() apiURL: string
  @Input() apiHeaderPath: string;
  @Input() apiDownloadPath: string;
  @Input() tabIndex: number;


  tableData: DistributionTable;
  tableHeader: Distribution[];
  dropdownList: DistributionDropdownData[];
  defaultFilter = distributionConstant.filter;
  dependentDropdownList: DistributionDropdownData[];
  recordPerPage: number = sharedConstants.pageSizeOption[0];
  pageNumber: number = 1;
  tableOption: TableOption;
  errorMsg: string;
  fAccess: any;
  activeTab: number;
  selectedURL: string = DistributionPath.DISTRIBUTIONAPIPATH;
  headerURL: string = DistributionPath.HEADERS;
  downloadURL: string = DistributionPath.DOWNLOAD;
  dataLocked: boolean;

  constructor(private toastService: ToastService, private distributionApiService: DistributionApiService,
    private distributionService: DistributionService, private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.getTableContent(this.apiURL, this.defaultFilter, this.setTableFilter(this.pageNumber, this.recordPerPage));
    this.dependentDropdownList = distributionConstant.dependentDropdownList;
    this.getDistributionTableRecords(this.defaultFilter, this.setTableFilter(this.pageNumber, this.recordPerPage));
    this.getDropdownLits();
    this.fAccess = this.authService.getFunction(RoleFunctions.Distribution);
    this.fAccess.update_limit = this.authService.getFunction(RoleFunctions.DistributionLimit)?.update;
    this.fAccess.update_quota = this.authService.getFunction(RoleFunctions.DistributionQuota)?.update;
  }

  ngOnChanges() {
    this.selectedURL = this.apiURL ?? this.selectedURL;
    this.headerURL = this.apiHeaderPath ?? this.headerURL;
    this.downloadURL = this.apiDownloadPath ?? this.downloadURL;
  }

  getDistributionByFilters(path: any, filter: any) {
    this.pageNumber = 1;
    const shwName = this.defaultFilter.showroomName;
    this.defaultFilter = filter.filters;
    this.defaultFilter.showroomName = shwName;
    const tableFilter: TableOption = this.setTableFilter(this.pageNumber, this.recordPerPage);
    this.getDistributionTableRecords(filter.filters, tableFilter);
  }

  getDistributionBySerach(filter: any) {
    this.pageNumber = 1;
    this.defaultFilter.showroomName = filter;
    const tableFilter: TableOption = this.setTableFilter(this.pageNumber, this.recordPerPage);
    this.getDistributionTableRecords(this.defaultFilter, tableFilter);
  }
  /**
   * When pagination is changed.
   */
  getTableData(currentPageNumber: PaginationOptions) {
    const tableOptions: TableOption = this.setTableFilter(currentPageNumber.currentPage, currentPageNumber.recordPerPage);
    this.getDistributionTableRecordsOnly(this.defaultFilter, tableOptions);
  }
  /**
   *  
   */
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
    return this.distributionApiService.getDistributionContent(path, option);
  }

  changedKey(key: FieldsValue) {
    // if (key.id) {
    this.distributionApiService.getAllMaster(`api/referencedata/${key.id}/${key.name}`).subscribe((res) => {
      this.appendListToDropdown(key, res);
    }, (error) => {
      this.appendListToDropdown(key, []);
    });
    this.dependentDropdownList = distributionConstant.dependentDropdownList;
    // }
  }

  appendListToDropdown(key: any, res: any) {
    distributionConstant.dependentDropdownList = distributionConstant.dependentDropdownList.map(
      (x: DistributionDropdownData) => {
        if (x.path == key.id) {
          x.data = [...res];
        }
        return x;
      });
  }
  /**
   * API:- LIST FOR FILTERS DROPDOWN
   */
  getDropdownLits() {
    const service = this.distributionApiService as any;
    this.dropdownList = distributionConstant.allShowroomDropDownData();
    for (let i = 0; i < distributionConstant.allShowroomDropDownData().length; i++) {
      service['getAllMaster'](distributionConstant.allShowroomDropDownData()[i].path).subscribe((res: any) => {
        this.dropdownList[i].data = [...res];
      });
    }
  }
  /**
   * MERGE API'S
   */
  getDistributionTableRecords(filterOptions: FilterForm, tableOptions: any) {
    const headersData: Observable<any> = this.getObeservable(this.headerURL, { filterOptions, tableOptions });
    const gridData: Observable<any> = this.getObeservable(this.selectedURL, { filterOptions, tableOptions });
    headersData.pipe(concatMap((header: Distribution[]) => {
      this.tableHeader = header;
      return gridData
    })).subscribe((res: DistributionTable) => {
      this.tableData = res;
      this.distributionService.sendHeaderRow({ headerRow: this.tableHeader, tableData: this.tableData });
      this.errorMsg = '';
      this.cd.detectChanges();
    }, (errorRes) => {
      this.errorMsg = errorRes.error;
      this.cd.detectChanges();
    });
  }


  getDistributionTableRecordsOnly(filterOptions: FilterForm, tableOptions: any) {
    //const headersData: Observable<any> = this.getObeservable(this.headerURL, { filterOptions, tableOptions });
    const gridData: Observable<any> = this.getObeservable(this.selectedURL, { filterOptions, tableOptions });
    gridData.subscribe((res: DistributionTable) => {
      this.tableData = res;
      this.distributionService.sendHeaderRow({ headerRow: this.tableHeader, tableData: this.tableData });
      this.errorMsg = '';
      this.cd.detectChanges();
    }, (errorRes) => {
      this.errorMsg = errorRes.error;
      this.cd.detectChanges();
    });
  }

  checkDataLock(monthId: number) {
    this.distributionApiService.checkDataLock(monthId).subscribe((resp) => {
      this.dataLocked = resp.limit;
    }, (error) => {

    });
  }

  saveAmountData(data: Distribution) {
    const tableOptions = { filterOptions: this.defaultFilter, tableOptions: this.setTableFilter(this.pageNumber, this.recordPerPage) }

    const headersData: Observable<any> = this.getObeservable(this.headerURL, tableOptions);

    this.distributionApiService.updateSummation(this.selectedURL, data).pipe(concatMap((updatedData: Distribution) => {
      return headersData
    }))
      .subscribe((res: any) => {
        this.tableHeader = res;
        this.distributionService.sendHeaderRow({ headerRow: this.tableHeader, tableData: this.tableData });
        this.toastService.show("Data saved successfully", { classname: 'bg-success text-white', delay: 3000 });
      }, (error) => {
        let er = "internal server error";
        this.toastService.show(er, { classname: 'bg-danger text-light', delay: 3000 });
        this.cd.detectChanges();
      });
  }

  download(httpParams: HttpParams) {

    httpParams = httpParams.set(`TableOptions.SortColumn`, this.tableOption.sortColumn);
    httpParams = httpParams.set(`TableOptions.SortOrder`, this.tableOption.sortOrder);

    this.distributionApiService.downloadDistributions(httpParams, this.downloadURL);
  }


  toggleShowLakhs(value: boolean) {
    this.distributionService.sendlakhsToggle(value);
  }
}
