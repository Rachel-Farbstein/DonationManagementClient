import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { Receipt, ReceiptAndFileDetails } from 'src/app/models/receipt.interface';
import { MessageService } from 'primeng/api';
import { ReceiptService } from 'src/app/services/receipt.service';
import { FileS3Service } from 'src/app/services/fileS3.service';

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
    private fileS3Service: FileS3Service,
  ) { }


  receipt: Receipt = {
    receiptId: 0,
    donationId: 0,
    file: undefined,
    receiptProductionDate: new Date()
  }

  receiptsList: ReceiptAndFileDetails[] = [];
  selectedReceipts: ReceiptAndFileDetails[] = [];
  rows = 5;
  metaKey: boolean = true;

  // receiptsList: Receipt[] = [];
  // selectedReceipts: Receipt[] = [];


  ngOnInit(): void {
    this.receiptService.receipAndFiletList$.subscribe(receipts => {
      this.receiptsList = receipts;
      receipts.forEach(r => {
        console.log('recId:', r.receiptDto.receiptId);
      })
    });
    this.receiptService.getReceiptAndfileDetails();
    // this.receiptService.getReceipts();
  }

  openReceiptsForm(receiptAndFileDetails?: ReceiptAndFileDetails) {
    const ref = this.dialogService.open(ReceiptFormComponent, {
      width: '450px',
      header: 'פרטי קבלה',
      data: { receiptAndFileDetails }
    });

    ref.onClose.subscribe((updatedReceipt) => {
      if (updatedReceipt) {
        if (receiptAndFileDetails) {
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

  fetchFileFromS3(receiptAndFileDetails: ReceiptAndFileDetails): void {
    const fileKey = receiptAndFileDetails.fileDetailsDto.s3FileKey;
    this.receiptService.getFileFromS3(receiptAndFileDetails.receiptDto.receiptId, receiptAndFileDetails.fileDetailsDto)
      .subscribe({
        next: (blob) => {
          const fileURL = URL.createObjectURL(blob);
          this.fileS3Service.addFileToCache(fileKey, fileURL);
          this.displayFilePreview(fileURL);
        },
        error: (err) => {
          console.error('Error fetching file:', err)
        }

      }
      );
  }

  deleteSelectedReceipts() {
    throw new Error('Method not implemented.');
  }

  previewFile(receiptAndFileDetails: ReceiptAndFileDetails): void {
    const fileKey = receiptAndFileDetails.fileDetailsDto.s3FileKey;
    const cachedFile = this.fileS3Service.getFileFromCache(fileKey);
    if (cachedFile) {
      // אם הקובץ כבר בזיכרון, השתמש בו
      this.displayFilePreview(cachedFile);
    } else {
      this.fetchFileFromS3(receiptAndFileDetails);
    }
  }

  displayFilePreview(fileURL: string): void {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<iframe src="${fileURL}" frameborder="0" style="width:100%;height:100%;"></iframe>`);
    } else {
      alert('Unable to open preview window');
    }
  }


}
