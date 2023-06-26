import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { OTableComponent } from './o-table/o-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReferenceUploadsComponent } from '../distribution/reference-uploads/reference-uploads.component';


@NgModule({
  declarations: [
    OverviewComponent,
    OTableComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class OverviewModule { }
