import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {



  ngOnInit(): void {

  }
}