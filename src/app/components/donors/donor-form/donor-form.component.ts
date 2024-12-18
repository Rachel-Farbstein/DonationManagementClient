import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Donor } from 'src/app/models/donor.interface';

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.scss']
})
export class DonorFormComponent {

  donor: Donor = {
    donorId: 0,
    fullName: '',
    email: '',
    address: '',
    phone: ''
  }

  submitted: boolean = false;

  fullNameControl = new FormControl<string>('', [
    Validators.required
  ]);
  emailControl = new FormControl<string>('', [
    Validators.required,
    Validators.email
  ]);
  addressControl = new FormControl<string>('');
  phoneControl = new FormControl('', [
    Validators.pattern('^[- +()0-9]+$')
  ]);

  donorDetailsForm = new FormGroup({
    fullNameControl: this.fullNameControl,
    emailControl: this.emailControl,
    addressControl: this.addressControl,
    phoneControl: this.phoneControl,
  });

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if (this.config.data && this.config.data.donor) {
      this.donor = { ...this.config.data.donor }; // Load existing donor for editing
      // this.fullNameControl.setValue(this.donor.fullName);
      // this.emailControl.setValue(this.donor.email);
      // this.addressControl.setValue(this.donor.address);
      // this.phoneControl.setValue(this.donor.phone);
    }
  }

  saveDonor() {
    // this.donor.address = this.addressControl.value ? this.addressControl.value : "";
    // this.donor.address = this.addressControl.value ? this.addressControl.value : "";
    // this.donor.address = this.addressControl.value ? this.addressControl.value : "";
    this.ref.close(this.donor); // Return updated/new donor
  }

  cancel() {
    this.ref.close();
  }

}
