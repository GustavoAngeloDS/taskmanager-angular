import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/models/board.model';
import { Stack } from 'src/app/shared/models/stack.model';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-board-panel',
  templateUrl: './board-panel.component.html',
  styleUrls: ['./board-panel.component.css']
})
export class BoardPanelComponent implements OnInit {
  board!: Board;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.populateObjects(id);
  }

  populateObjects(boardId: number): void {
    this.board = this.findBoard(boardId);
  }

  findBoard(boardId: number): Board {
    return new Board(1, "Quadro Mock", "Quadro teste");
  }

  findBoardStacks(boardId: number): Array<Stack> {
    return [new Stack(1, "TO DO"), new Stack(2, "DOING"), new Stack(3, "FINISHED")];
  }

  findTasks(boardId: number): Array<Task> {
    return [new Task(1, "Título tarefa teste", "Descrição teste")];
  }

  filterTasksByColumn(columnId: number): Array<Task> {
    return this.taskList.filter((task) => task.)
  }
}