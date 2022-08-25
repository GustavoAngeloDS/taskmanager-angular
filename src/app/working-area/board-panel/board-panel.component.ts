import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Action } from 'src/app/shared/enums/action';
import { Board } from 'src/app/shared/models/board.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { Stack } from 'src/app/shared/models/stack.model';
import { Task } from 'src/app/shared/models/task.model'
import { ModalStackEditComponent } from '../modal-stack-edit/modal-stack-edit.component';
import { ModalTaskComponent } from '../modal-task/modal-task.component';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-board-panel',
  templateUrl: './board-panel.component.html',
  styleUrls: ['./board-panel.component.css']
})
export class BoardPanelComponent extends PageBehavior implements OnInit {
  board!: Board;
  stackList!: Array<Stack>;

  showNewStackButton: boolean = true;
  isInsertingNewStack: boolean = false;

  newStackName?: string;

  draggedTask!: Task;

  constructor(private modalService: NgbModal, private workingAreaService: WorkingAreaService, private route: ActivatedRoute) {
    super();
    this.draggedTask = new Task();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.findBoard(id);
  }

  findBoard(boardId: string): void {
    this.isLoadCompleted = false;

    this.workingAreaService.findBoardById(boardId).subscribe(
      (board) => this.board = board,
      () => { },
      () => this.findStacks(boardId)
    )
  }

  findStacks(boardId: string): void {
    this.workingAreaService.findStacksByBoard(boardId).subscribe(
      (stacks: Array<Stack>) => this.stackList = stacks,
      () => { },
      () => {
        this.isLoadCompleted = true
      }
    );
  }

  findTasksByStack(stackId: string): Array<Task> {
    let tasks = this.stackList.find((stack) => stack.id === stackId)?.taskList;
    return tasks === undefined ? [] : tasks;
  }

  saveNewTaskStack(boardId: string, taskId: string, newStackId: string): void {
    this.workingAreaService.changeTaskStack(boardId, taskId, newStackId!).subscribe();
  }

  saveNewStack(): void {
    this.workingAreaService.saveNewStack(this.board.id!, new Stack(undefined, this.newStackName, undefined)).subscribe();
    this.changeInsertMode();
    this.findBoard(this.board.id!);
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

  updateTaskPositionAndSync(event: CdkDragDrop<Task[]>, newStackId?: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.saveNewTaskStack(this.board.id!, this.draggedTask.id!, newStackId!);  
      this.clearDraggedTask(); 
    }
  }

  clearDraggedTask() {
    this.draggedTask = new Task();
  }

  openModalStackUpdate(stack: Stack): void {
    const modal = this.modalService.open(ModalStackEditComponent);
    modal.componentInstance.stack = stack;
    modal.componentInstance.boardId = this.board.id!;
    modal.closed.subscribe({ complete: () => this.findBoard(this.board.id!) });
  }

  openModalViewTask(task?: Task, stackId?: string): void {
    const modal = this.modalService.open(ModalTaskComponent);
    modal.componentInstance.boardId = this.board.id;

    if (task != null && task != undefined) {
      modal.componentInstance.task = task;
      modal.componentInstance.screenAction = Action.EDITING;
    } else {
      modal.componentInstance.screenAction = Action.INSERTING;
      modal.componentInstance.stackId = stackId;
    }

    modal.closed.subscribe({ complete: () => this.findBoard(this.board.id!) });
  }
}