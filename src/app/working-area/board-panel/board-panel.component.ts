import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/models/board.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { Stack } from 'src/app/shared/models/stack.model';
import { Task } from 'src/app/shared/models/task.model'
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-board-panel',
  templateUrl: './board-panel.component.html',
  styleUrls: ['./board-panel.component.css']
})
export class BoardPanelComponent extends PageBehavior implements OnInit {
  board!: Board;

  showNewStackButton: boolean = true;
  isInsertingNewStack: boolean = false;

  newStackName?: string;

  constructor(private route: ActivatedRoute, private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.populateBoardPanel(id);
  }

  populateBoardPanel(boardId: number): void {
    this.board = this.findBoard(boardId);
  }
  findBoard(boardId: number): Board {
    return new Board(1, "Quadro Mock", "Quadro teste", this.findBoardStacks(boardId));
  }

  findBoardStacks(boardId: number): Array<Stack> {
    let taskList1: Task[] = [
      new Task(1, "Tarefa teste 1 da stack 1", "Descrição teste 1"),
      new Task(2, "Tarefa teste 2 da stack 1", "Descrição teste 2"),
      new Task(3, "Tarefa teste 3 da stack 1", "Descrição teste 3")
    ]

    let taskList2: Task[] = [
      new Task(1, "Tarefa teste 1 da stack 2", "Descrição teste 1"),
      new Task(2, "Tarefa teste 2 da stack 2", "Descrição teste 2"),
      new Task(3, "Tarefa teste 3 da stack 2", "Descrição teste 3"),
      new Task(4, "Tarefa teste 4 da stack 2", "Descrição teste 4"),
      new Task(5, "Tarefa teste 5 da stack 2", "Descrição teste 5")
    ]

    let taskList3: Task[] = [
      new Task(1, "Tarefa teste 1 da stack 3", "Descrição teste 1"),
      new Task(2, "Tarefa teste 2 da stack 3", "Descrição teste 2"),
    ]
    return [new Stack(1, "TO DO", taskList1), new Stack(2, "DOING", taskList2), new Stack(3, "DONE", taskList3)];
  }

  findTasksByStack(stackId: number): Array<Task> {
    let task = this.board.stackList?.find((stack) => stack.id === stackId);
    return task?.taskList === undefined ? [] : task?.taskList;
  }

  changeInsertMode(): void {
    this.clearInputFields();

    if (this.isInsertingNewStack) {
      this.isInsertingNewStack = false;
      this.showNewStackButton = true;
    } else {
      this.isInsertingNewStack = true;
      this.showNewStackButton = false;
    }
  }

  clearInputFields(): void {
    this.newStackName = "";
  }

  saveNewStack(): void {
    this.board.stackList?.push(new Stack(10, this.newStackName, undefined));
    this.changeInsertMode();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}