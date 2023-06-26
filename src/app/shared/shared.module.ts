import { AmountFormaterPipe } from './../main/dashboard/pipe/amount-formater.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Model } from '../main/distribution/reference-uploads/model';
import { ReferenceUploadsComponent } from '../main/distribution/reference-uploads/reference-uploads.component';
import { LQTableComponent } from './components/lqtable/lqtable.component';
import { MetTableComponent } from './components/met-table/met-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToastComponent } from './components/toast/toast.component';
import { RoundUpPipe } from './pipes/round-up.pipe';


@NgModule({
  declarations: [
    MetTableComponent,
    ToastComponent,
    PaginationComponent,
    RoundUpPipe,
    LQTableComponent,
    ReferenceUploadsComponent,
    AmountFormaterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiSwitchModule,
    NgbToastModule,
    NgbPaginationModule,
    NgSelectModule
  ],
  exports: [
    MetTableComponent,
    ToastComponent,
    PaginationComponent,
    LQTableComponent,
    ReferenceUploadsComponent,
    AmountFormaterPipe
  ],
  providers: [Model]
})
export class SharedModule { }
