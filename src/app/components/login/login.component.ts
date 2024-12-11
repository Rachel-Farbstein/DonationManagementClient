import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    this.login();
  }

  login() {
    this.oidcSecurityService.authorize();
  }

}

