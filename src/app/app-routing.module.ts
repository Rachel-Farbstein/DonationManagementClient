import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorsComponent } from './components/donors/donors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { DonationsComponent } from './components/donations/donations.component';
import { ReceiptsComponent } from './components/receipts/receipts.component';
import { MonthlyDiagramComponent } from './components/charts/monthly-diagram/monthly-diagram.component';
import { ChartsComponent } from './components/charts/charts.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'redirect',
    component: RedirectComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'donors',
        component: DonorsComponent,
        title: 'Donors'
      },
      {
        path: 'donations',
        component: DonationsComponent,
        title: 'Donations'
      },
      {
        path: 'receipts',
        component: ReceiptsComponent,
        title: 'Receipts'
      },
      {
        path: 'charts',
        component: ChartsComponent,
        title: 'Charts'
      },
    ]
  },
  {
    path: '',
    // redirectTo: '/dashboard',
    redirectTo: '/login',
    pathMatch: 'full',
    title: 'Login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
