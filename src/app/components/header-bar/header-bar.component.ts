import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

  userData$: Observable<any>;

  constructor(private authService: AuthService, private oidcSecurityService: OidcSecurityService) {
    this.userData$ = this.oidcSecurityService.userData$;
  }

  logout() {
    this.authService.logout();
  }



}
