import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddAmountPipe } from './pipe/add-amount.pipe';
import { DaOptionsComponent } from './component/d-options/da-options.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardApiService } from './dashboard-api.service';
import { AmountFormaterPipe } from './pipe/amount-formater.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    AddAmountPipe,
    DaOptionsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,    
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers:[
    DashboardApiService,
    NgbActiveModal
  ]
})
export class DashboardModule { }
