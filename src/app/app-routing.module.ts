import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DonorsComponent } from './components/donors/donors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthModule } from 'angular-auth-oidc-client';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // {
  //   path: '',
  //   redirectTo: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_BInmkuf6F',
  //   pathMatch: 'full',
  //   title: 'Login'
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    title: 'Dashboard'
  },
  {
    path: 'donors',
    component: DonorsComponent,
    title: 'Donors'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    //   AuthModule.forRoot({
    //   config: {
    //     authority: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_BInmkuf6F',
    //     redirectUrl: 'http://localhost:4200/dashboard',
    //     clientId: '6pijc2mjedsj94884qfgvh0m1a',
    //     scope: 'email openid phone',
    //     responseType: 'code'
    //   },
    // }),
  ],
  exports: [RouterModule]//AuthModule
})
export class AppRoutingModule { }
