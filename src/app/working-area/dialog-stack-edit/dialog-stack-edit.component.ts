import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogStackDeleteComponent } from 'src/app/working-area/dialog-stack-delete/dialog-stack-delete.component';
import { Stack } from 'src/app/shared/models/stack.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-stack-edit',
  templateUrl: './dialog-stack-edit.component.html',
  styleUrls: ['./dialog-stack-edit.component.css']
})
export class DialogStackEditComponent implements OnInit {

  @Input() stack!: Stack;
  @Input() boardId!: string;
  dialogId!: string;

  constructor(private matDialog: MatDialog, private workingAreaService: WorkingAreaService, public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  updateStack() {
    this.workingAreaService.updateStack(this.boardId, this.stack).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Stack atualizada");
        this.closeDialog();
      },
      error: (error) => this.notificationService.showError(error.message)
    });
  }

  openDialogStackDelete() {
    const dialog = this.matDialog.open(DialogStackDeleteComponent, {
      data: {
        stack: this.stack,
        boardId: this.boardId
      }
    });

    dialog.componentInstance.dialogId = dialog.id;

    dialog.afterClosed().subscribe({
      complete: () => this.closeDialog()
    });
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }
}
