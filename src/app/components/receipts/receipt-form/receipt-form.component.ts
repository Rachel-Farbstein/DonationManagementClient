import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Donation } from 'src/app/models/donation.interface';
import { FileDetails } from 'src/app/models/fileDetails-interface';
import { Receipt } from 'src/app/models/receipt.interface';
import { DonationService } from 'src/app/services/donation.service';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss']
})
export class ReceiptFormComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fileUploadService: FileUploadService,
    private dialogService: DialogService,
    private donationService: DonationService,
    private receiptService: ReceiptService,
    private fb: FormBuilder) {
    if (this.config.data.receiptAndFileDetails) {
      this.receipt = { ...this.config.data.receiptAndFileDetails.receiptDto };
      this.fileDetails = { ...this.config.data.receiptAndFileDetails.fileDetailsDto };
    }
  }

  receipt: Receipt = {
    receiptId: 0,
    donationId: 0,
    file: undefined,
    receiptProductionDate: new Date()
  }

  fileDetails: FileDetails = {
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

  donationsLoading: boolean = false;
  fileLoading: boolean = false;
  donationIdsList: number[] = [];
  receiptForm!: FormGroup;

  ngOnInit(): void {

    this.fetchDonations();

    this.receiptForm = this.fb.group({
      donationId: [this.receipt.donationId, [Validators.required]],
      receiptProductionDate: ['', [Validators.required]],
      file: [this.receipt.file, [Validators.required]]
    });

    if (this.receipt.receiptId)
      this.fetchFileFromS3(this.receipt.receiptId, this.fileDetails);

    var dateValue = new Date(this.receipt.receiptProductionDate);
    this.receiptForm.patchValue({
      receiptProductionDate: dateValue
    });
  }

  fetchDonations() {
    this.donationsLoading = true;
    this.donationService.donationList$.subscribe(
      {
        next: (donations) => {
          this.donationIdsList = donations.map(donation => donation.donation.donationId);
          this.donationsLoading = true;
        },
        error: (err) => {
          this.donationsLoading = true;
          console.error('Error fetching donors', err);
        }
      }
    );
    this.donationService.getDonations();
  }

  fetchFileFromS3(receiptId: number, fileDetails: FileDetails): void {
    this.fileLoading = true;
    this.receiptService.getFileFromS3(receiptId, fileDetails).subscribe({
      next: (blob: Blob) => {
        const file = new File([blob], fileDetails.fileName,
          {
            type: blob.type,
          });
        this.receipt.file = file;
        this.fileLoading = false;
        this.receiptForm.patchValue({
          file: file
        });
      },
      error: (error) => {
        this.fileLoading = false;
        console.error('Failed to fetch file:', error);
      }
    }
    );
  }

  saveReceipt() {
    const formValues = { ...this.receiptForm.value };
    this.receipt.donationId = formValues['donationId'];
    this.receipt.receiptProductionDate = formValues['receiptProductionDate'];
    this.receipt.file = formValues['file'];
    this.ref.close(this.receipt);
  }
  cancel() {
    this.ref.close();
  }


  onFileUpload(event: any): void {
    this.receipt.file = event.files[0];
    this.receiptForm.patchValue({
      file: this.receipt.file
    });
    console.log('File uploaded:', this.receipt.file);
  }

  removeFile() {
    this.receipt.file = undefined;
    this.receiptForm.patchValue({
      file: this.receipt.file
    });
  }
}
