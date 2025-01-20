import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Donor } from 'src/app/models/donor.interface';

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.scss']
})
export class DonorFormComponent implements OnInit {


  donor: Donor = {
    donorId: 0,
    fullName: '',
    email: '',
    address: '',
    phone: ''
  }

  // fullNameControl = new FormControl<string>('', [
  //   Validators.required
  // ]);
  // emailControl = new FormControl<string>('', [
  //   Validators.required,
  //   Validators.email
  // ]);
  // addressControl = new FormControl<string>('');
  // phoneControl = new FormControl('', [
  //   Validators.pattern('^[- +()0-9]+$')
  // ]);

  // donorDetailsForm = new FormGroup({
  //   fullNameControl: this.fullNameControl,
  //   emailControl: this.emailControl,
  //   addressControl: this.addressControl,
  //   phoneControl: this.phoneControl,
  // });

  donorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    if (this.config.data && this.config.data.donor) {
      this.donor = { ...this.config.data.donor }; // Load existing donor for editing
    }
  }
  ngOnInit(): void {
    this.donorForm = this.fb.group({
      fullName: [this.donor.fullName, [Validators.required]],
      email: [this.donor.email, [Validators.required, Validators.email]],
      address: [this.donor.address, []],
      phone: [this.donor.phone, [Validators.pattern('^[- +()0-9]+$')]]
    });

  }

  saveDonor() {
    const formValues = { ...this.donorForm.value };
    this.donor.fullName = formValues['fullName'];
    this.donor.email = formValues['email'];
    this.donor.address = formValues['address'];
    this.donor.phone = formValues['phone'];
    this.ref.close(this.donor); // Return updated/new donor
  }

  cancel() {
    this.ref.close();
  }

}
