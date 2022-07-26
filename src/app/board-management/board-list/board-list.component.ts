import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  
  boardList : Array<Board> = [];

  ngOnInit(): void {
    this.boardList.push(
      new Board(1, "Board teste", "Descrição teste"), 
      new Board(2, "Board teste", "Descrição teste"),
      new Board(3, "Board teste", "Descrição teste"),
      new Board(4, "Board teste", "Descrição teste"),
      new Board(5, "Board teste", "Descrição teste"),
      new Board(6, "Board teste", "Descrição teste")
      );
  }
}
