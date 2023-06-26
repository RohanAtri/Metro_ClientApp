import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DOptionsComponent } from './d-options/d-options.component';
import { DTableComponent } from './d-table/d-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionRoutingModule } from './distribution-routing.module';
import { DistributionComponent } from './distribution.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { ReferenceUploadsComponent } from './reference-uploads/reference-uploads.component';
import { DistributionApiService } from './services/distribution-api.service';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralComponent } from './general/general.component';


@NgModule({
  declarations: [
    DTableComponent,
    DOptionsComponent,
    DistributionComponent,
    SearchFilterPipe,
    GeneralComponent,
  ],
  imports: [
    CommonModule,
    DistributionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgSelectModule
  ],
  providers: [
    DistributionApiService,
    NgbActiveModal
  ]
})
export class DistributionModule { }
