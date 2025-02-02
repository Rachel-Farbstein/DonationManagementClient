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
import { FileS3Service } from 'src/app/services/fileS3.service';
import { FileDetails } from 'src/app/models/fileDetails-interface';
import { Observable } from 'rxjs';

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
    private fileS3Service: FileS3Service,
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
  fileName?: string;
  fileSize?: string;
  isFileChange: boolean = false;
  isFileLoading: boolean = false;

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
            life: 30000
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
    this.isFileChange = false;
    if (this.donationWithDonorName.fileDetails) {
      this.fileName = this.donationWithDonorName.fileDetails.fileName;
      this.fileSize = this.formatFileSize(this.donationWithDonorName.fileDetails.fileSize);
    }
    op.toggle(event);
  }



  onFileUpload(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.donationWithDonorName.donation.file = input.files[0];
      this.fileName = this.donationWithDonorName.donation.file.name;
      this.fileSize = this.formatFileSize(this.donationWithDonorName.donation.file.size);
      this.isFileChange = true;
      console.log('Selected file:', this.donationWithDonorName.donation.file?.name);
    }


  }

  removeFile() {
    this.donationWithDonorName.donation.file = undefined;
    this.fileName = '';
    this.fileSize = '';
  }

  viewFile(): void {
    if (this.donationWithDonorName.donation.file) {
      this.preventFile(this.donationWithDonorName.donation.file);
    }
    else {
      if (this.donationWithDonorName.donation.fileId && this.donationWithDonorName.fileDetails) {
        const fileUrl = this.fileS3Service.getFileFromCache(this.donationWithDonorName.fileDetails.s3FileKey);
        if (fileUrl)
          window.open(fileUrl, '_blank');
        else {
          this.isFileLoading = true;
          this.fetchFileFromS3(this.donationWithDonorName.fileDetails).subscribe(
            {
              next: (file: File) => {
                this.donationWithDonorName.donation.file = file;
                const fileUrl = URL.createObjectURL(file);
                if (this.donationWithDonorName.fileDetails) {
                  this.fileS3Service.addFileToCache(this.donationWithDonorName.fileDetails.s3FileKey, fileUrl);
                }
                this.isFileLoading = false;
                window.open(fileUrl, '_blank');
              },
              error: () => {
                this.isFileLoading = false;
                this.messageService.add({ severity: 'error', summary: 'נכשל', detail: 'קובץ לא נמצא', life: 3000 });
              }
            }
          );
        }
      }
    }
  }

  preventFile(file: File) {
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, '_blank');
  }

  saveFile(event: Event, op: OverlayPanel) {
    if (this.donationWithDonorName.donation.file) {
      this.isFileLoading = true;
      this.donationService.addFileToDonation(
        this.donationWithDonorName.donation.donationId,
        this.donationWithDonorName.donation.file).subscribe({
          next: (fileDetails) => {
            this.isFileChange = false;
            this.donationWithDonorName.donation.fileId = fileDetails.fileId;
            this.donationWithDonorName.fileDetails = fileDetails;
            this.isFileLoading = false;
            op.toggle(event);
            this.messageService.add({ severity: 'success', summary: 'נשמר', detail: 'קובץ נשמר בהצלחה', life: 3000 });
          },
          error: (err) => {
            this.isFileLoading = false;
            console.error('upload file failed', err);
          },
        });
    }
  }

  confirmDeleteDonationFile(event: Event, op: OverlayPanel) {
    op.toggle(event);
    this.deleteConfirmDialogData.question = `האם אתר בטוח שברצונך למחוק את הקובץ ${this.donationWithDonorName.fileDetails?.fileName} ?`;
    this.onAcceptConfirmDialogAction = () => this.deleteDonationFile(event, op);
    this.showConfirmDialog = true;
  }


  deleteDonationFile(event: Event, op: OverlayPanel) {
    this.isFileLoading = true;
    this.donationService.deleteDonationFile(this.donationWithDonorName.donation.donationId).subscribe(
      {
        next: () => {
          this.donationWithDonorName.donation.file = undefined;
          this.donationWithDonorName.donation.fileId = undefined;
          this.donationWithDonorName.fileDetails = undefined;
          this.isFileLoading = false;
          this.messageService.add({ severity: 'success', summary: 'נמחק', detail: 'קובץ נמחק בהצלחה', life: 3000 });
        },
        error: (err) => {
          this.isFileLoading = false;
          this.messageService.add({ severity: 'error', summary: 'נכשל', detail: 'מחיקת קובץ נכשלה', life: 3000 });
        },
      }
    );
  }

  formatFileSize(size: any): string {
    var retValue: string;
    if (size < 1024) {
      retValue = `${size} Bytes`;
      return retValue;
    } else if (size < 1024 * 1024) {
      // return (size / 1024).toFixed(2) + ' KB';
      retValue = `${(size / 1024).toFixed(2)} KB`;
      return retValue;
    } else {
      // return (size / (1024 * 1024)).toFixed(2) + ' MB';
      retValue = `${(size / (1024 * 1024)).toFixed(2)} MB`;
      return retValue;
    }
  }

  fetchFileFromS3(fileDetails: FileDetails): Observable<File> {
    return this.fileS3Service.fetchFileFromS3(fileDetails);
  }
}

