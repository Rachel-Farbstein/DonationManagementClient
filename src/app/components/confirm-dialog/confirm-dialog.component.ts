import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModel } from 'src/app/models/confirm-dialog-model';



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent {

  @Input() visible: boolean = false;
  @Input() data: ConfirmDialogModel = {};
  @Input() onAcceptAction: () => void = () => { };

  @Output() accept: EventEmitter<void> = new EventEmitter();
  @Output() reject: EventEmitter<void> = new EventEmitter();

  onAccept() {
    this.onAcceptAction();
    this.accept.emit();
    this.visible = false;
  }

  onReject() {
    this.reject.emit();
    this.visible = false; // סגירת הדיאלוג
    console.log("X");
  }
}
