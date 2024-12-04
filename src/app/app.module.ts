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
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthService } from './services/auth.service';


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
    RatingModule,
    FormsModule,
    InputNumberModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    RippleModule,
    InputMaskModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessagesModule,
    SidebarModule,
    OverlayPanelModule,
  ],
  providers: [
    ConfirmationService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true
    }],

  bootstrap: [AppComponent],

})
export class AppModule { }
