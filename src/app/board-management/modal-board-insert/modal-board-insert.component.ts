import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-modal-board-insert',
  templateUrl: './modal-board-insert.component.html',
  styleUrls: ['./modal-board-insert.component.css']
})
export class ModalBoardInsertComponent implements OnInit {

  @ViewChild('formNewBoard')
  formNewBoard!: NgForm;

  dialogId!: string;
  newBoard!: Board;

  constructor(private matDialog: MatDialog, public boardManagementService: BoardManagementService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.newBoard = new Board();
  }

  saveBoard(): void {
    this.boardManagementService.saveBoard(this.newBoard).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Board cadastrado");
        this.closeDialog();
      },
      error: (error) => this.notificationService.showError(error.message)
    })
  }

  closeDialog() {
    return this.matDialog.getDialogById(this.dialogId)!.close();
  }
}