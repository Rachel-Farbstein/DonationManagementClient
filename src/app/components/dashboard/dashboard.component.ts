import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) { }

  userData: any;

  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  isMenuCollapsed = false;

  ngOnInit() {
    this.oidcSecurityService.userData$.subscribe((data) => {
      this.userData = data;
      console.log('User Data:', data);
    });
  }

  onToggleMenu(isCollapsed: any) {
    this.isMenuCollapsed = isCollapsed; // עדכון המצב לפי הערך שהגיע מהבן
  }

}
