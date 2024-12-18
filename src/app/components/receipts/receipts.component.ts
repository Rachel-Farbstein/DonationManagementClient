import { Component } from '@angular/core';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent {

  selectedReceipts = [];

  AddReceipt() {
    throw new Error('Method not implemented.');
  }
  deleteSelectedReceipts() {
    throw new Error('Method not implemented.');
  }

}
