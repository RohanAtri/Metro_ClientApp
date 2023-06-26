import { MasterComponent } from './master.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from 'src/app/services/auth-gaurd.service';

const routes: Routes = [{ path: '', component: MasterComponent, canActivate: [AuthGaurdService]  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
