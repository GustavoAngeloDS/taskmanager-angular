import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/shared/models/board.model';
import { ModalBoardEditComponent } from '../modal-board-edit/modal-board-edit.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  
  boardList : Array<Board> = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.boardList.push(
      new Board(1, "Board teste 1", "Descrição teste 1"), 
      new Board(2, "Board teste 2", "Descrição teste 2"),
      new Board(3, "Board teste 3", "Descrição teste 3"),
      new Board(4, "Board teste 4", "Descrição teste 4"),
      new Board(5, "Board teste 5", "Descrição teste 5"),
      new Board(6, "Board teste 6", "Descrição teste 6")
      );
  }

  openModalBoardEdit(board: Board): void {
    const modal = this.modalService.open(ModalBoardEditComponent);
    modal.componentInstance.board = board;
  }
}
