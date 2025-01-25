import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor() {

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
        route: ['/dashboard', 'donations'],
        icon: 'pi pi-dollar'
      },
      {
        label: 'קבלות',
        route: ['/dashboard', 'receipts'],
        icon: 'pi pi-receipt'
      }
    ];
  }

  toggleMenuState() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleMenu.emit(this.isCollapsed);
  }

}
