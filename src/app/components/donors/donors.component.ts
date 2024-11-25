import { Component, inject } from '@angular/core';
import { Donor } from '../../models/donor.interface';
import { TableRowSelectEvent, TableRowUnSelectEvent } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss'],
  providers: [MessageService]
})
export class DonorsComponent {

  constructor(private messageService: MessageService) { }

  // private messageService = inject(MessageService);

  onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Donor Selected', detail: event.data.fullName });
  }

  onRowUnselect(event: any) {
  }

  deleteSelectedProducts() {
    throw new Error('Method not implemented.');
  }
  openNew() {
    throw new Error('Method not implemented.');
  }

  first = 0;
  rows = 10;
  metaKey: boolean = true;
  selectedDonors!: Donor[] | null;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.donorList ? this.first === this.donorList.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.donorList ? this.first === 0 : true;
  }

  donorList: Donor[] = [
    {
      id: 11,
      fullName: 'רחל פרבשטיין ',
      email: 'rachely7331',
      address: 'רובין',
      phone: '7331'
    },
    {
      id: 22,
      fullName: 'יהודה פרבשטיין ',
      email: 'rachely7331',
      address: 'רובין',
      phone: '3162'
    },
    {
      id: 33,
      fullName: 'שלום פרבשטיין ',
      email: 'rachely7331',
      address: 'רובין',
      phone: '000'
    }
  ];
}
