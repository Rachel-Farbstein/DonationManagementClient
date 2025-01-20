import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { Receipt } from 'src/app/models/receipt.interface';
import { MessageService } from 'primeng/api';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss'],
  providers: [MessageService]
})
export class ReceiptsComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private receiptService: ReceiptService,
  ) { }


  receipt: Receipt = {
    receiptId: 0,
    donationId: 0,
    file: undefined,
    receiptProductionDate: new Date()

  }

  receiptsList: Receipt[] = [];
  selectedReceipts: Receipt[] = [];
  selectedFile: File | null = null;
  rows = 5;
  metaKey: boolean = true;

  ngOnInit(): void {
    this.receiptService.receiptList$.subscribe(receipts => {
      this.receiptsList = receipts;
      receipts.forEach(r => {
        console.log('recId:', r.receiptId);
      })
    });
    this.receiptService.getReceipts();
  }

  openReceiptsForm(receipt?: Receipt) {
    if (receipt != null)
      console.log('openrecId:', receipt.receiptId);
    const ref = this.dialogService.open(ReceiptFormComponent, {
      width: '450px',
      header: 'פרטי קבלה',
      data: { receipt }
    });

    ref.onClose.subscribe((updatedReceipt) => {
      if (updatedReceipt) {
        if (receipt) {
          // this.editReceipt(updatedReceipt);
        }
        else {
          this.addReceipt(updatedReceipt);
        }
      }
    });
  }

  addReceipt(receipt: Receipt) {
    receipt.receiptId = 0;
    this.receiptService.addReceipt(receipt)
      .subscribe({
        next: (receipt) => {
          this.receiptService.addReceipt(receipt)
          this.messageService.add(
            {
              severity: 'success',
              summary: 'נשמר',
              detail: 'תרומה נשמרה בהצלחה',
              life: 3000
            })
        },
        error: (err) => {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'נכשל',
              detail: err,
              life: 3000
            })
          console.log(err)
        }
      });

  }

  deleteSelectedReceipts() {
    throw new Error('Method not implemented.');
  }

  showFile(receipt: Receipt) {

  }

}
