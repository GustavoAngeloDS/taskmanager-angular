import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BoardInvitation } from 'src/app/shared/models/board-invitation.model';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-dialog-members-management',
  templateUrl: './dialog-members-management.component.html',
  styleUrls: ['./dialog-members-management.component.css']
})
export class DialogMembersManagementComponent implements OnInit {

  dialogId!: string;
  board!: Board;
  newMemberMail!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private boardManagementService: BoardManagementService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.newMemberMail = "";
    this.findBoard(this.data.boardId);
  }

  findBoard(boardId: string) {
    this.boardManagementService.findById(boardId).subscribe({
      next: (board: Board) => this.board = board
    });
  }

  sendInvite() {
    let boardInvitation: BoardInvitation = new BoardInvitation(undefined, this.board.id!, this.newMemberMail);
    this.boardManagementService.sendBoardInvitation(boardInvitation).subscribe({
      next: (boardInvitation: BoardInvitation) => {
        if (boardInvitation.id == undefined) {
          this.notificationService.showWarning("O usuário informado não faz parte da plataforma");
        } else {
          this.notificationService.showSuccess("Convite enviado ao usuário");
        }
        this.cleanInput();
      }
    });
  }

  cleanInput() {
    this.newMemberMail = "";
  }
}