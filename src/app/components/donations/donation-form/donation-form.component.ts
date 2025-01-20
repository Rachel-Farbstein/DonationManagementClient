import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Donation, DonationWithDonorNameDto, PaymentType, PaymentTypeOptions } from 'src/app/models/donation.interface';
import { Donor } from 'src/app/models/donor.interface';
import { DonorsService } from 'src/app/services/donors.service';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss']
})
export class DonationFormComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private donorService: DonorsService) {
    if (this.config.data && this.config.data.donationWithDonorName) {
      this.donationWithDonorName = { ...this.config.data.donationWithDonorName };
    }
  }

  donationWithDonorName: DonationWithDonorNameDto = {
    donation: {
      donationId: 0,
      donorId: 0,
      donationDate: new Date(),
      amount: 0,
      paymentType: PaymentType.BankTransfer,
      notes: ''
    },
    donorName: ''
  };


  donors: Donor[] = [];
  donorOptions: { label: string; value: number }[] = [];
  initDonorName?: { label: string; value: number } = {
    label: '',
    value: 0
  };
  donationForm!: FormGroup;
  paymentTypeOptions: { label: string; value: number }[] = [];

  donorsLoading: boolean = false;

  ngOnInit(): void {

    this.fetchDonors();

    this.paymentTypeOptions = Object.entries(PaymentTypeOptions).map(([key, value]) => ({
      label: value,
      value: +key
    }));

    this.donationForm = this.fb.group({
      donorName: [null, [Validators.required]],
      amount: [this.donationWithDonorName.donation.amount, [Validators.required, Validators.min(1)]],
      donationDate: ['', [Validators.required]],
      paymentType: [this.donationWithDonorName.donation.paymentType, [Validators.required]],
      donorId: [this.donationWithDonorName.donation.donorId, [Validators.required]],
      notes: [this.donationWithDonorName.donation.notes, []]
    });

    this.initDonorName = this.donorOptions.find(d => d.value === this.donationWithDonorName.donation.donorId);
    this.donationForm.patchValue({
      donorName: this.initDonorName?.value
    });

    var dateValue = new Date(this.donationWithDonorName.donation.donationDate);
    this.donationForm.patchValue({
      donationDate: dateValue
    });
  }

  fetchDonors() {
    this.donorsLoading = true;
    this.donorService.donorList$.subscribe(
      donors => {
        this.donors = donors;
        this.donorOptions = this.donors.map(donor => ({
          label: donor.fullName,
          value: donor.donorId
        }));
        this.donorsLoading = false;
      },
      error => {
        console.error('Error fetching donors', error);
        this.donorsLoading = false;
      }
    );
    this.donorService.getDonors();
  }


  updateDonorId(selectedValue: number): void {
    this.donationForm.patchValue({ donorId: selectedValue });
  }

  updatePaymentType(selectedValue: number) {
    console.log("paymentType:", selectedValue);
  }

  saveDonation() {
    const formValues = { ...this.donationForm.value };
    this.donationWithDonorName.donation.donorId = formValues['donorName'];
    this.donationWithDonorName.donation.amount = formValues['amount'];
    this.donationWithDonorName.donation.donationDate = formValues['donationDate'];
    this.donationWithDonorName.donation.paymentType = formValues['paymentType'];
    this.donationWithDonorName.donation.notes = formValues['notes'];
    this.ref.close(this.donationWithDonorName.donation);
  }

  cancel() {
    this.ref.close();
  }

  onDropdownFocus() {
    console.log("drop focus");
    if (this.donors.length === 0) {
      this.donorsLoading = true;
      console.log("this.donorsLoading", this.donorsLoading);
      // this.fetchDonors();
    }
  }

}
