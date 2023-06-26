import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DaOptionsComponent } from './d-options/da-options.component';


@NgModule({
  declarations: [
    ReportComponent,
    DaOptionsComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportModule { }
