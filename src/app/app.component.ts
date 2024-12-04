import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  title = 'DonationManagement';
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // private readonly oidcSecurityService = inject(OidcSecurityService);

  // configuration$ = this.oidcSecurityService.getConfiguration();

  // userData$ = this.oidcSecurityService.userData$;

  // isAuthenticated = false;

  // ngOnInit(): void {
  //   this.oidcSecurityService.isAuthenticated$.subscribe(
  //     ({ isAuthenticated }) => {
  //       this.isAuthenticated = isAuthenticated;

  //       console.warn('authenticated: ', isAuthenticated);
  //     }
  //   );
  // }

  // login(): void {
  //   this.oidcSecurityService.authorize();
  //   console.log("login");
  // }

}
