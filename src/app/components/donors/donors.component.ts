import { Component, inject, OnInit } from '@angular/core';
import { Donor } from '../../models/donor.interface';
import { TableRowSelectEvent, TableRowUnSelectEvent } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorsService } from 'src/app/services/donors.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss'],
  providers: [MessageService]
})
export class DonorsComponent implements OnInit {

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private donorServise: DonorsService) { }
  // private messageService = inject(MessageService);

  donorList!: Donor[];
  rows = 5;
  metaKey: boolean = true;
  selectedDonors!: Donor[] | null;
  donorDialog: boolean = false;
  donor!: Donor;
  submitted: boolean = false;
  messages: Message[] = [];

  fullNameControl = new FormControl<string>('', [
    Validators.required
  ])
  emailControl = new FormControl<string>('', [
    Validators.required,
    Validators.email
  ]);
  addressControl = new FormControl<string>('');
  phoneControl = new FormControl('', [
    Validators.pattern('^[- +()0-9]+$')
  ])

  donorDetailsForm = new FormGroup({
    fullNameControl: this.fullNameControl,
    emailControl: this.emailControl,
    addressControl: this.addressControl,
    phoneControl: this.phoneControl,
  });

  ngOnInit(): void {
    this.getDonors();
  }

  getDonors() {
    this.donorServise.getDonors()
      .subscribe(donors => this.donorList = donors);
  }

  fillDonorFromForm() {
    this.donor.fullName = this.fullNameControl.value ? this.fullNameControl.value : '';
    this.donor.email = this.emailControl.value ? this.emailControl.value : '';
    this.donor.address = this.addressControl.value ? this.addressControl.value : '';
    this.donor.phone = this.phoneControl?.value ? this.phoneControl.value : '';
  }

  saveDonor() {
    const that = this;
    console.log("Id:", this.donor.donorId);
    this.fillDonorFromForm();
    if (!this.donor.donorId) {
      this.donorServise.addDonor(this.donor)
        .subscribe(donor => (
          this.donor = donor,
          this.donorList.push(this.donor),
          this.messageService.add(
            {
              severity: 'success',
              summary: 'נשמר',
              detail: 'תורם נשמר בהצלחה',
              life: 3000
            }),
          this.afterSaveDonor()
        )
        );
    }
    else {
      let ind = this.findIndexById(this.donor.donorId);
      if (ind >= 0) {
        this.donorServise.editDonor(this.donor)
          .subscribe({
            next(donor) {
              that.donor = donor;
              that.messageService.add(
                {
                  severity: 'success',
                  summary: 'נשמר',
                  detail: 'תורם עודכן בהצלחה',
                  life: 3000
                });
              that.afterSaveDonor();
            }
          });
      }
    }

  }

  afterSaveDonor() {
    this.submitted = true;
    this.donorList = [...this.donorList];
    this.donorDialog = false;
    this.initDonor();
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.donorList.length; i++) {
      if (this.donorList[i].donorId === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  initDonor() {
    this.donor = {
      donorId: 0,
      fullName: "",
      email: "",
      address: "",
      phone: ""
    };
  }

  onRowSelect(event: any) {
  }

  onRowUnselect(event: any) {
  }

  deleteSelectedDonors() {
    this.confirmationService.confirm({
      header: 'האם אתה בטוח',
      message: 'נא אשר את מחיקת התורמים שנבחרו',
      acceptLabel: 'מחק',
      rejectLabel: 'בטל',
      accept: () => {
        this.deleteDonors();
      }
    }
    );
  }

  async deleteDonors() {
    let selectedIds = this.selectedDonors?.map(donor => donor.donorId);
    const response = await this.donorServise.removeDonors(selectedIds).
      catch((err) => {
        this.messageService.add(
          {
            severity: 'error', summary: 'פעולה נכשלה', detail: ' :מחיקת הרשומות נכשלה'
          }
        )
        return null;
      })

    if (!response) {
      return;
    }
    this.getDonors();
    this.donorList = [...this.donorList];
    this.selectedDonors = [];
    this.messageService.add({ severity: 'success', summary: 'נמחק', detail: 'תורמים נמחקו בהצלחה', life: 3000 });
  }

  openNewDonor() {
    this.initDonor();
    this.donorDetailsForm.reset();
    this.submitted = false;
    this.donorDialog = true;
  }

  deleteDonor(donor: Donor) {

    this.confirmationService.confirm({
      header: 'האם אתה בטוח',
      message: 'נא אשר את מחיקת ' + donor.fullName,
      acceptLabel: 'מחק',
      rejectLabel: 'בטל',
      accept: () => {
        this.donorServise.removeDonor(donor.donorId);
        this.getDonors();
        this.donorList = [...this.donorList];
        this.messageService.add({ severity: 'success', summary: 'נמחק', detail: 'תורם נמחק בהצלחה', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });

  }

  editDonor(donor: Donor) {
    this.donor = donor;
    this.submitted = false;
    this.donorDialog = true;
    this.fullNameControl.setValue(donor.fullName);
    this.emailControl.setValue(donor.email);
    this.addressControl.setValue(donor.address);
    this.phoneControl.setValue(donor.phone);
  }

  hideDialog() {
    this.donorDialog = false;
    this.submitted = false;
  }

}
