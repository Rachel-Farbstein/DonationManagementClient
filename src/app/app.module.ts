import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { DonorsComponent } from './components/donors/donors.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthService } from './services/auth.service';
import { AuthConfigModule } from './auth/auth-config.module';
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { DonationsComponent } from './components/donations/donations.component';
import { ReceiptsComponent } from './components/receipts/receipts.component';

const initializeAppFactory = (primeNGConfig: PrimeNGConfig) => () => {
  primeNGConfig.ripple = true;
};


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HeaderBarComponent,
    DonorsComponent,
    DashboardComponent,
    LoginComponent,
    RedirectComponent,
    LogoutComponent,
    DonationsComponent,
    ReceiptsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToolbarModule,
    MenuModule,
    TableModule,
    FieldsetModule,
    ToastModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    RippleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessagesModule,
    SidebarModule,
    OverlayPanelModule,
    AuthConfigModule,
  ],
  providers: [
    ConfirmationService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],

  bootstrap: [AppComponent],

})
export class AppModule { }
