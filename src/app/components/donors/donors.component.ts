import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Donor } from '../../models/donor.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DonorsService } from 'src/app/services/donors.service';
import { Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModel } from 'src/app/models/confirm-dialog-model';
import { DonorFormComponent } from './donor-form/donor-form.component';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss'],
  providers: [MessageService]
})
export class DonorsComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private donorService: DonorsService,
    private dialogService: DialogService
  ) { }

  // private messageService = inject(MessageService);

  showConfirmDialog: boolean = false;
  donorList!: Donor[];
  rows = 5;
  metaKey: boolean = true;
  selectedDonors?: Donor[] | null;
  donorDialog: boolean = false;
  donor!: Donor;
  submitted: boolean = false;
  messages: Message[] = [];
  deleteConfirmDialogData: ConfirmDialogModel = {
  }
  onAcceptConfirmDialogAction: () => void = () => { };

  ngOnInit(): void {
    this.donorService.donorList$.subscribe(donors => {
      this.donorList = donors;
    });
    this.donorService.getDonors();
  }

  openDonorForm(donor?: Donor) {
    const ref = this.dialogService.open(DonorFormComponent, {
      width: '450px',
      header: 'פרטי תורם',
      data: { donor }
    });

    ref.onClose.subscribe((updatedDonor) => {
      if (updatedDonor) {
        if (donor) {
          this.editDonor(updatedDonor);
        }
        else {
          this.addDonor(updatedDonor);
        }
      }
    });
  }

  addDonor(donor: Donor) {
    this.donorService.addDonor(donor)
      .subscribe(donor => (
        this.donor = donor,
        this.messageService.add(
          {
            severity: 'success',
            summary: 'נשמר',
            detail: 'תורם נשמר בהצלחה',
            life: 3000
          })
      ));
  }

  editDonor(donor: Donor) {
    this.donorService.editDonor(donor)
      .subscribe(donor => (
        this.donor = donor,
        this.messageService.add(
          {
            severity: 'success',
            summary: 'נשמר',
            detail: 'תורם עודכן בהצלחה',
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

  onRowSelect(event: any) {
  }

  onRowUnselect(event: any) {
  }

  confirmDeleteDonor(donor: Donor) {
    this.deleteConfirmDialogData.question = `האם אתה בטוח שברצונך למחוק את ${donor.fullName} ?`;
    this.onAcceptConfirmDialogAction = () => this.deleteDonor(donor.donorId);
    this.showConfirmDialog = true;
  }

  deleteDonor(donorId: number): void {
    this.donorService.deleteDonor(donorId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'נמחק', detail: 'תורם נמחק בהצלחה', life: 3000 });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'נכשל', detail: err.message, life: 3000 });
      }
    });
  }

  confirmDeleteSelDonors() {
    var cnt = this.selectedDonors?.length;
    this.deleteConfirmDialogData.question = `האם אתה בטוח שברצונך למחוק ${cnt} תורמים?`;
    this.onAcceptConfirmDialogAction = () => this.deleteDonors();
    this.showConfirmDialog = true;
  }

  deleteDonors() {
    let selectedIds = this.selectedDonors?.map(donor => donor.donorId);
    this.donorService.deleteDonors(selectedIds).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'נמחק', detail: 'תורמים נמחקו בהצלחה', life: 3000 });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'פעולה נכשלה', detail: ' :מחיקת הרשומות נכשלה' });
      }
    });
  }

}
