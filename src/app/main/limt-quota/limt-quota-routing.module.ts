import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimitQuotaComponent } from './limit-quota.component';

const routes: Routes = [
  {
    path: '', component: LimitQuotaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimtQuotaRoutingModule { }
