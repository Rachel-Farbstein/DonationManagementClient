import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private router: Router) {

  }

  isCollapsed: boolean = false;
  @Output() toggleMenu = new EventEmitter<boolean>();
  menuItems: any[] | undefined;

  ngOnInit() {
    this.menuItems = [
      {
        label: 'בית',
        route: ['/dashboard'],
        icon: 'pi pi-home'
      },
      {
        label: 'תורמים',
        route: ['/dashboard', 'donors'],
        icon: 'pi pi-address-book'
      },
      {
        label: 'תרומות',
        route: ['dashboard', 'donates'],
        icon: 'pi pi-dollar'
      }
    ];
  }

  toggleMenuState() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleMenu.emit(this.isCollapsed);
  }

  // navigateTo(route: string): void {
  //   this.router.navigate([route]); // Navigate using Angular Router
  //   // this.router.navigate(['dashboard', route]);
  // }

  // isActive(route: string): boolean {
  //   return this.router.url === route;
  // }
}
