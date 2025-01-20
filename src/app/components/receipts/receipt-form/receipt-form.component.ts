import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Donation } from 'src/app/models/donation.interface';
import { Receipt } from 'src/app/models/receipt.interface';
import { DonationService } from 'src/app/services/donation.service';
import { FileUploadService } from 'src/app/services/fileUpload.service';

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
    private fb: FormBuilder) {
    if (this.config.data && this.config.data.receipt) {
      this.receipt = { ...this.config.data.receipt };
    }
  }

  receipt: Receipt = {
    receiptId: 0,
    donationId: 0,
    file: undefined,
    receiptProductionDate: new Date()
  }

  donationsLoading: boolean = false;
  donationIdsList: number[] = [];
  receiptForm!: FormGroup;

  ngOnInit(): void {

    this.fetchDonations();
    this.receiptForm = this.fb.group({
      donationId: [null, [Validators.required]],
      productionDate: [this.receipt.receiptProductionDate, [Validators.required]],
      file: [this.receipt.file, [Validators.required]]
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

  saveReceipt() {
    const formValues = { ...this.receiptForm.value };
    this.receipt.donationId = formValues['donationId'];
    this.receipt.receiptProductionDate = formValues['productionDate'];
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
