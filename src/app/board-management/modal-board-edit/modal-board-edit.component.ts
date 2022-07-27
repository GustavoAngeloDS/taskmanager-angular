import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-modal-board-edit',
  templateUrl: './modal-board-edit.component.html',
  styleUrls: ['./modal-board-edit.component.css']
})
export class ModalBoardEditComponent implements OnInit {

  @Input() board!: Board;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }

  updateBoard(): void {
    this.closeModal();

    console.log("ATUALIZANDO BOARD");
    console.log(this.board);
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
