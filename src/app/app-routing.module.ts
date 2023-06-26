import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGaurdService } from './services/auth-gaurd.service';

const routes: Routes = [

  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    component: AppShellComponent, canActivate: [AuthGaurdService],
    children: [
      {
        path:'',
        pathMatch:'full',
        redirectTo:'dashboard'
      },
      // { path: '', loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'dashboard', loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'overview', loadChildren: () => import('./main/overview/overview.module').then(m => m.OverviewModule) },
      { path: 'masters', loadChildren: () => import('./main/master/master.module').then(m => m.MasterModule) },
      { path: 'report', loadChildren: () => import('./main/report/report.module').then(m => m.ReportModule) },
      { path: 'distribution', loadChildren: () => import('./main/distribution/distribution.module').then(m => m.DistributionModule) },
      { path: 'limitQuota', loadChildren: () => import('./main/limt-quota/limt-quota.module').then(m => m.LimtQuotaModule) },
    ]
  },
  {
    path: '**', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
