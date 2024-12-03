import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DonorsComponent } from './components/donors/donors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthModule } from 'angular-auth-oidc-client';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_BInmkuf6F',
    pathMatch: 'full',
    title: 'Login'
  },
  {
    path: 'donors',
    component: DonorsComponent,
    title: 'Donors'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    // AuthModule.forRoot({
    //   config: {
    //     authority: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_BInmkuf6F',
    //     redirectUrl: 'http://localhost:4200/dashboard',
    //     clientId: '6pijc2mjedsj94884qfgvh0m1a',
    //     scope: 'phone openid email',
    //     responseType: 'code'
    //   },
    // }),
  ],
  exports: [RouterModule, AuthModule]
})
export class AppRoutingModule { }
