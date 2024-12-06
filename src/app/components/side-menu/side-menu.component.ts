import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'בית',
        route: '/dashboard',
        icon: 'pi pi-home'
      },
      {
        label: 'תורמים',
        route: ['donors'],
        icon: 'pi pi-address-book'
      },
      {
        label: 'תרומות',
        route: '/donates',
        icon: 'pi pi-dollar'
      }
    ];
  }

}
