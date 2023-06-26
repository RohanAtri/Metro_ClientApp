import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './../../shared/shared.module';

import { LimitQuotaOptionsComponent } from './limit-quota-options/limit-quota-options.component';
import { LimitQuotaComponent } from './limit-quota.component';
import { LimtQuotaRoutingModule } from './limt-quota-routing.module';


@NgModule({
  declarations: [
    LimitQuotaComponent,
    LimitQuotaOptionsComponent,
    // LQTableComponent
  ],
  imports: [
    CommonModule,
    LimtQuotaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbNavModule,
    FormsModule,
    NgSelectModule
  ]
})
export class LimtQuotaModule { }
