import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from 'src/app/services/auth-gaurd.service';
import { ReportComponent } from './report.component';

const routes: Routes = [{ path: '', component: ReportComponent, canActivate: [AuthGaurdService] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
