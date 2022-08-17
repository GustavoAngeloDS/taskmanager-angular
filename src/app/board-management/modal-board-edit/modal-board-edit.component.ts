import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-modal-board-edit',
  templateUrl: './modal-board-edit.component.html',
  styleUrls: ['./modal-board-edit.component.css']
})
export class ModalBoardEditComponent implements OnInit {

  @Input() board!: Board;

  constructor(public activeModal: NgbActiveModal, public boardManagementService: BoardManagementService, public notificationService: NotificationService) { }

  ngOnInit(): void {

  }

  updateBoard(): void {
    this.boardManagementService.updateBoard(this.board).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Quadro atualizado");
        this.activeModal.close();
      },
      error: (error) => this.notificationService.showError(error.message)
    });
  }
}