import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RoleFunctions } from 'src/app/shared/constants/shared.enums';
import { dashboardConstant } from '../dashboard/constant/dashboard.constant';
import { DashboardDropdownData } from '../dashboard/models/dashboard.model';
import { TableOption } from '../limt-quota/models/limit-quota-interface';
import { ReportServiceService } from './report-service.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  showerror: boolean;
  fAccess: any;
  filterForm: FormGroup;
  subscription: Subscription = new Subscription();
  reports: any;
  tableOption: TableOption = { sortColumn: '', sortOrder: '', pageNo: 0, pageSize: 0 };


  constructor(private _reportService: ReportServiceService,private fb: FormBuilder,private authService: AuthService ) { }

  ngOnInit(): void {
    this.buildFilterForm();
    this.getDropdownLits();
    this.getReports();
    this.fAccess = this.authService.getFunction(RoleFunctions.Distribution);
  }

  getReports() {
    this.subscription.add(
      this._reportService.getReports().subscribe(response => {
        this.reports = response;
      })
    );
  }

  export() {
    if(!this.filterForm.valid){
      this.showerror=true;
      return;
    }
    var httpParams = new HttpParams();

    httpParams = httpParams.set(`fperiodId`, this.filters.periodId ?? "");
    httpParams = httpParams.set(`fcompanyId`, this.filters.fcompanyId ?? "");
    httpParams = httpParams.set(`fgenderId`, this.filters.fgenderId ?? "");
    httpParams = httpParams.set(`fcategoryId`, this.filters.fcategoryId ?? "");
    httpParams = httpParams.set(`fbrandtypeId`, this.filters.fbrandtypeId ?? "");

    this._reportService.export(this.report?.value, httpParams);
  }
  get report() {
    return this.filterForm.get('report');
  } 
  buildFilterForm(values: any = null) {
    this.filterForm = this.fb.group({
      report: [values ?? values?.report, Validators.required]
    });
  }

  dropdownList: DashboardDropdownData[];
  /**
   * API:- LIST FOR FILTERS DROPDOWN
   */
   getDropdownLits() {
    const service = this._reportService as any;
    this.dropdownList = dashboardConstant.allShowroomDropDownData();
    for (let i = 0; i < dashboardConstant.allShowroomDropDownData().length; i++) {
      service['getAllMaster'](dashboardConstant.allShowroomDropDownData()[i].path).subscribe((res: any) => {
        this.dropdownList[i].data = [...res];
      });
    }
  }

  
  filters: any = {
    fcompanyId: null,
    fgenderId: null,
    fcategoryId: null,
    fsubcategoryId: null,
    fagId: null,
    fbrandtypeId: null,
    fbrandnameId: null
  };

  getDistributionByFilters(path: any, filter: any) {
    const data = filter.filters;
    this.filters.fcompanyId = data.companyId?.length == 0 ? null : data.companyId?.join(',');
    this.filters.fgenderId = data.genderId?.length == 0 ? null : data.genderId?.join(',');
    this.filters.fbrandtypeId = data.brandtypeId?.length == 0 ? null : data.brandtypeId?.join(',');
    this.filters.fcategoryId = data.categoryId?.length == 0 ? null : data.categoryId?.join(',');
    this.filters.fsubcategoryId = data.subcategoryId?.length == 0 ? null : data.subcategoryId?.join(',');
    this.filters.fagId = data.agId?.length == 0 ? null : data.agId?.join(',');
    this.filters.fbrandnameId = data.brandnameId?.length == 0 ? null : data.fbrandnameId?.join(',');
    this.filters.periodId = data.periodId?.length == 0 ? null : data.periodId?.join(',');
  }

}
