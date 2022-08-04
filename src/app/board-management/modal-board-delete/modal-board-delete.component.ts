import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-modal-board-delete',
  templateUrl: './modal-board-delete.component.html',
  styleUrls: ['./modal-board-delete.component.css']
})
export class ModalBoardDeleteComponent implements OnInit {
  @Input() board!: Board;

  constructor(public activeModal: NgbActiveModal, public boardManagementService: BoardManagementService, public notificationService: NotificationService) { }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.activeModal.close();
  }

  deleteBoard(): void {
    this.boardManagementService.removeBoard(this.board).subscribe(
      {
        error: (error) => this.notificationService.showError(error.message), complete: () => {
          this.notificationService.showSuccess("Quadro removido");
          this.closeModal();
        }
      }
    );
  }
}
