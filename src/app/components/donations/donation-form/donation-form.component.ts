import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Donation, PaymentType } from 'src/app/models/donation.interface';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss']
})
export class DonationFormComponent implements OnInit {

  selectedDonations: Donation[] = [];
  donationList: Donation[] = [];
  rows = 5;
  metaKey: boolean = true;
  submitted: boolean = false;

  @Input() donationDetails?: Donation;

  donorNameControl = new FormControl<string>('', [
    Validators.required
  ]);
  amountControl = new FormControl<number>(0, [
    Validators.required
  ]);
  donationDateControl = new FormControl<Date>(new Date, [
    Validators.required
  ]);
  paymentTypeControl = new FormControl<PaymentType>(PaymentType.BankTransfer, [
    Validators.required
  ]);

  donationDetailsForm = new FormGroup({
    donorNameControl: this.donorNameControl,
    amountControl: this.amountControl,
    donationDateControl: this.donationDateControl,
    paymentTypeControl: this.paymentTypeControl,
  });

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  filldonationDetailsForm() {
  }

  hideDialog() {
    this.submitted = false;
  }

  submitDonation() {
    throw new Error('Method not implemented.');
  }

}
