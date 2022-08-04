import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-modal-board-insert',
  templateUrl: './modal-board-insert.component.html',
  styleUrls: ['./modal-board-insert.component.css']
})
export class ModalBoardInsertComponent implements OnInit {

  board!: Board;

  constructor(public activeModal: NgbActiveModal, public boardManagementService: BoardManagementService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.board = new Board();
  }

  saveBoard(): void {
    this.boardManagementService.saveBoard(this.board).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Board cadastrado");
        this.activeModal.close();
      },
      error: (error) => this.notificationService.showError(error.message)
    })
  }
}
