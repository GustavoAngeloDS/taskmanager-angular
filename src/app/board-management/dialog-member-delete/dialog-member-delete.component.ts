import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-dialog-member-delete',
  templateUrl: './dialog-member-delete.component.html',
  styleUrls: ['./dialog-member-delete.component.css']
})
export class DialogMemberDeleteComponent implements OnInit {

  dialogId!: string;
  memberToDelete!: User;
  boardId!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private boardManagementService: BoardManagementService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.memberToDelete = this.data.memberToDelete;
  }

  deleteMember(): void {
    this.boardManagementService.removeMember(this.boardId, this.memberToDelete.email!).subscribe({
      complete: () => this.closeDialog()
    });
  }

  closeDialog(): void {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }
}
