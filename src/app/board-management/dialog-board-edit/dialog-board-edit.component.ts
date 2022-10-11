import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-dialog-board-edit',
  templateUrl: './dialog-board-edit.component.html',
  styleUrls: ['./dialog-board-edit.component.css']
})
export class DialogBoardEditComponent implements OnInit {

  board!: Board;
  dialogId!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private boardManagementService: BoardManagementService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.findBoard(this.data.boardId);
  }

  findBoard(boardId: string) {
    this.boardManagementService.findById(boardId).subscribe({
      next: (board: Board) => this.board = board
    });
  }

  updateBoard() {
    this.boardManagementService.updateBoard(this.board).subscribe({
      complete: () => {
        this.closeDialog();
        this.notificationService.showSuccess("Quadro atualizado com sucesso");
      },
      error: (error) => this.notificationService.showError("Falha ao atualizar quadro: [" + error.message + "]")
    })
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }

}
