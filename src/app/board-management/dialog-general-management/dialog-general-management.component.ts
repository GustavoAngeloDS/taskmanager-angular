import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/shared/models/board.model';
import { DialogBoardDeleteComponent } from '../dialog-board-delete/dialog-board-delete.component';
import { DialogBoardEditComponent } from '../dialog-board-edit/dialog-board-edit.component';
import { DialogMembersManagementComponent } from '../dialog-members-management/dialog-members-management.component';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-dialog-general-management',
  templateUrl: './dialog-general-management.component.html',
  styleUrls: ['./dialog-general-management.component.css']
})
export class DialogGeneralManagementComponent implements OnInit {

  board!: Board;
  dialogId!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private boardManagementService: BoardManagementService) {
  }

  ngOnInit(): void {
    this.findBoard(this.data.boardId);
  }

  findBoard(boardId: string) {
    this.boardManagementService.findById(boardId).subscribe({
      next: (board: Board) => this.board = board
    });
  }

  openDialogBoardDelete() {
    const dialog = this.matDialog.open(DialogBoardDeleteComponent);
    dialog.componentInstance.board = this.board;
    dialog.componentInstance.dialogId = dialog.id;
    dialog.afterClosed().subscribe({
      complete: () => this.matDialog.getDialogById(this.dialogId)!.close()
    });
  }

  openDialogBoardEdit() {
    const dialog = this.matDialog.open(DialogBoardEditComponent, {
      data: {
        boardId: this.board.id!
      }
    });
    dialog.componentInstance.dialogId = dialog.id;

    dialog.afterClosed().subscribe({
      complete: () => this.findBoard(this.data.boardId)
    });
  }

  openDialogMembersManagement() {
    const dialog = this.matDialog.open(DialogMembersManagementComponent, {
      data: {
        boardId: this.board.id!
      }
    });
    dialog.componentInstance.dialogId = dialog.id;
  }
}
