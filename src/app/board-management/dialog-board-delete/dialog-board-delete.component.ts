import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-dialog-board-delete',
  templateUrl: './dialog-board-delete.component.html',
  styleUrls: ['./dialog-board-delete.component.css']
})
export class DialogBoardDeleteComponent implements OnInit {
  board!: Board;
  dialogId!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, public boardManagementService: BoardManagementService, public notificationService: NotificationService) { }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }

  deleteBoard(): void {
    this.boardManagementService.removeBoard(this.board).subscribe(
      {
        error: (error) => this.notificationService.showError(error.message), complete: () => {
          this.notificationService.showSuccess("Quadro removido");
          this.closeDialog();
        }
      }
    );
  }
}
