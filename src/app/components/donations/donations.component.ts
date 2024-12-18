import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Donation, PaymentType } from 'src/app/models/donation.interface';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent {

  selectedDonations: Donation[] = [];
  donationList: Donation[] = [];
  rows = 5;
  metaKey: boolean = true;
  submitted: boolean = false;

  editDonation(_t54: any) {
    throw new Error('Method not implemented.');
  }
  deleteDonation(_t54: any) {
    throw new Error('Method not implemented.');
  }

  deleteSelectedDonations() {

  }
  openNewDonation() {

  }

}
