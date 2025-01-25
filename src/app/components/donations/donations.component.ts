import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Donation, DonationWithDonorNameDto, PaymentType, PaymentTypeOptions } from 'src/app/models/donation.interface';
import { MessageService } from 'primeng/api';
import { DonationService } from 'src/app/services/donation.service';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { ConfirmDialogModel } from 'src/app/models/confirm-dialog-model';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
  providers: [MessageService]
})
export class DonationsComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private donationService: DonationService,
    private datePipe: DatePipe
  ) { }

  donationWithDonorName: DonationWithDonorNameDto = {
    donation: {
      donationId: 0,
      donorId: 0,
      donationDate: new Date(),
      amount: 0,
      paymentType: PaymentType.BankTransfer,
      notes: ''
    },
    donorName: '',
    fileDetails: {
      fileId: 0,
      fileName: '',
      s3FileKey: '',
      s3FileUrl: '',
      s3BucketName: '',
      contentType: '',
      fileSize: '',
      uploadedAt: new Date(),
      isDeleted: false
    }
  };

  selectedDonations: DonationWithDonorNameDto[] = [];
  donationList: DonationWithDonorNameDto[] = [];
  rows = 5;
  metaKey: boolean = true;
  fileText?: string;

  //Confirm Dialog Data:
  showConfirmDialog: boolean = false;
  deleteConfirmDialogData: ConfirmDialogModel = {
  }
  onAcceptConfirmDialogAction: () => void = () => { };

  ngOnInit(): void {
    this.donationService.donationList$.subscribe(donations => {
      this.donationList = donations;
    });
    this.donationService.getDonations();
  }

  openDonationForm(donationWithDonorName?: DonationWithDonorNameDto) {
    const ref = this.dialogService.open(DonationFormComponent, {
      width: '450px',
      header: 'פרטי תרומה',
      data: { donationWithDonorName }
    });

    ref.onClose.subscribe((updatedDonation) => {
      if (updatedDonation) {
        if (donationWithDonorName) {
          this.editDonation(updatedDonation);
        }
        else {
          this.addDonation(updatedDonation);
        }
      }
    });
  }

  addDonation(donation: Donation) {
    donation.donationId = 0;
    this.donationService.addDonation(donation)
      .subscribe(donation => (
        this.donationWithDonorName.donation = donation,
        this.messageService.add(
          {
            severity: 'success',
            summary: 'נשמר',
            detail: 'תרומה נשמרה בהצלחה',
            life: 3000
          })
      ));
  }

  editDonation(donation: Donation) {
    this.donationService.editDonation(donation)
      .subscribe(donation => (
        this.donationWithDonorName.donation = donation,
        this.messageService.add(
          {
            severity: 'success',
            summary: 'נשמר',
            detail: 'תרומה עודכנה בהצלחה',
            life: 3000
          }))
      )
  }


  onAcceptConfirmDialog() {
    this.showConfirmDialog = false;
  }

  onRejectConfirmDialog() {
    this.showConfirmDialog = false;
  }

  confirmDeleteSelDonations() {
    var cnt = this.selectedDonations?.length;
    this.deleteConfirmDialogData.question = `האם אתה בטוח שברצונך למחוק ${cnt} תרומות?`;
    this.onAcceptConfirmDialogAction = () => this.deleteDonations();
    this.showConfirmDialog = true;
  }

  deleteDonations() {
    let selectedIds = this.selectedDonations?.map(dontionWithDonorName => dontionWithDonorName.donation.donationId);
    this.donationService.deleteDonations(selectedIds).subscribe({
      next: () => {
        this.selectedDonations = [];
        this.messageService.add({ severity: 'success', summary: 'נמחק', detail: 'תרומות נמחקו בהצלחה', life: 3000 });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'פעולה נכשלה', detail: ' :מחיקת הרשומות נכשלה' });
      }
    });
  }

  confirmDeleteDonation(donation: DonationWithDonorNameDto) {
    var dateString = this.datePipe.transform(donation.donation.donationDate, "dd-MM-yyyy");
    this.deleteConfirmDialogData.question = ` האם אתה בטוח שברצונך למחוק את תרומה מספר ${donation.donation.donationId} של ${donation.donorName} מתאריך ${dateString}?`;
    this.onAcceptConfirmDialogAction = () => this.deleteDonation(donation.donation.donationId);
    this.showConfirmDialog = true;
  }

  deleteDonation(donationId: number): void {
    this.donationService.deleteDonation(donationId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'נמחק', detail: 'תרומה נמחקה בהצלחה', life: 3000 });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'נכשל', detail: err.message, life: 3000 });
      }
    });
  }

  openReceiptForm(event: Event, donationWithDonorName: DonationWithDonorNameDto, op: OverlayPanel) {
    this.donationWithDonorName = donationWithDonorName;
    if (this.donationWithDonorName.fileDetails) {
      this.fileText = this.donationWithDonorName.fileDetails.fileName;
    }
    else {
      this.fileText = "לא קיים קובץ";
    }

    op.toggle(event);
  }

}

