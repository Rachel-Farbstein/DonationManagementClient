import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DonorsComponent } from './components/donors/donors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthModule } from 'angular-auth-oidc-client';
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './components/logout/logout.component';


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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'donors',
        component: DonorsComponent,
        title: 'Donors'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    title: 'Dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
