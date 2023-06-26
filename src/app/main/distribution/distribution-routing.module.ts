import { GeneralComponent } from './general/general.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from 'src/app/services/auth-gaurd.service';
import { DistributionComponent } from './distribution.component';

const routes: Routes = [
  { path: '', component: GeneralComponent, canActivate: [AuthGaurdService]  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributionRoutingModule { }
