import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/shared/models/board.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-modal-board-details',
  templateUrl: './modal-board-details.component.html',
  styleUrls: ['./modal-board-details.component.css']
})
export class ModalBoardDetailsComponent implements OnInit {

  @Input() board!: Board;

  constructor(public activeModal: NgbActiveModal, public notificationService: NotificationService) { }

  ngOnInit(): void {

  }

  /*updateBoard(): void {
    this.boardManagementService.updateBoard(this.board).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Quadro atualizado");
        this.activeModal.close();
      },
      error: (error) => this.notificationService.showError(error.message)
    });
  }*/
}