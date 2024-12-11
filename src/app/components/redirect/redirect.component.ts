import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { userInfo } from 'os';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent {

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private authService: AuthService,
    private router: Router) { }

  userData: any;

  ngOnInit() {

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.oidcSecurityService.getAccessToken().subscribe((token) => {
          console.log('JWT Token:', token);
          localStorage.setItem('jwt', token);
        });
        this.authService.setUserInfo();
        this.router.navigate(['/dashboard']);
      }
      else {
        this.router.navigate(['/logout']);
        console.error('Authentication failed');
      }
    })

  }

}
