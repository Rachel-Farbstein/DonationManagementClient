import { Component, OnInit } from '@angular/core';
import { AuthOptions, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    console.log('login component');
    this.login();
  }

  login() {
    const opt: AuthOptions = {
      customParams: {
        locale: 'he'
      }
    }
    this.oidcSecurityService.getAuthorizeUrl().subscribe(url => {
      const loginUrl = `${url}&locale=he`;
      console.log('Login URL:', loginUrl);
    });

    // const loginUrl = 'https://eu-north-1fg2yyzfrc.auth.eu-north-1.amazoncognito.com/oauth2/authorize?client_id=1s6o9ut1ajuqqbenev2k0i5r3m&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fredirect&response_type=code&scope=email%20openid%20phone&nonce=e9703c06580cc5cabc7a240b1d5ac53c86vV83R3v&state=1a64f6aa854b7be2eb33955287217b3b3dJKRA2uq&code_challenge=8NU5a-qv7q3V8F2Xxpc-uO404WlPg_w0smF5-BhMv_M&code_challenge_method=S256&locale=he';
    // window.location.href = loginUrl;

    this.oidcSecurityService.authorize('', {
      customParams: {
        locale: 'he',
        scope: 'openid email profile'

      }
    });
  }

}

