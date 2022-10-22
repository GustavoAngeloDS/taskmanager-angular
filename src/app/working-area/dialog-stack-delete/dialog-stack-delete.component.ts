import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Stack } from '../../shared/models/stack.model';
import { NotificationService } from '../../shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-stack-delete',
  templateUrl: './dialog-stack-delete.component.html',
  styleUrls: ['./dialog-stack-delete.component.css']
})
export class DialogStackDeleteComponent implements OnInit {

  dialogId!: string;
  stack!: Stack;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, public workingAreaService: WorkingAreaService, public notificationService: NotificationService) {
    this.stack = data.stack;
  }

  ngOnInit(): void {
  }

  deleteStack() {
    this.workingAreaService.removeStack(this.data.boardId!, this.stack.id!).subscribe({
      next: (stack: Stack) => {
        if (stack == undefined || stack == null) {
          this.notificationService.showSuccess("Stack removida com sucesso");
          this.closeDialog();
        } else {
          this.notificationService.showWarning("Remova todas as Tasks da Stack antes de excluí-la");
        }
      }
    });
  }

  closeDialog(): void {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }
}
