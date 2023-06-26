import { NgSelectModule } from '@ng-select/ng-select';
import { MasterDataService } from './services/master-data-api.service';
import { ProductDataService } from './services/product-data.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { MasterService } from './services/master.service';

import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataModalComponent } from './components/master-data-modal/master-data-modal.component';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoleFunctionComponent } from './components/role-function/role-function.component';
import { UserFunctionComponent } from './components/user-function/user-function.component';


@NgModule({
  declarations: [
    MasterComponent,
    MasterDataModalComponent,
    RoleFunctionComponent,
    UserFunctionComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    NgbModalModule,
    SharedModule,
    NgSelectModule
  ],
  providers: [
    MasterService,
    ProductDataService,
    MasterDataService
  ]
})
export class MasterModule { }
