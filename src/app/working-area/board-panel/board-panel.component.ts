import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Action } from 'src/app/shared/enums/action';
import { Board } from 'src/app/shared/models/board.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { Stack } from 'src/app/shared/models/stack.model';
import { Task } from 'src/app/shared/models/task.model'
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
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

  reloadInterval: number = 3;

  constructor(private matDialog: MatDialog, private modalService: NgbModal, private workingAreaService: WorkingAreaService, private route: ActivatedRoute) {
    super(false, Action.EDITING);
    this.draggedTask = new Task();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.findBoard(id);

    setInterval(() => {
      if (this.draggedTask.id! == undefined)
        this.findStacks(id);
    }, this.reloadInterval * 1000);
  }

  findBoard(boardId: string): void {
    this.isLoadCompleted = false;

    this.workingAreaService.findBoardById(boardId).subscribe({
      next: (board) => this.board = board,
      complete: () => this.findStacks(boardId)
    });
  }

  findStacks(boardId: string): void {
    this.workingAreaService.findStacksByBoard(boardId).subscribe({
      next: (stacks: Array<Stack>) => this.stackList = stacks,
      complete: () => this.isLoadCompleted = true
    });
  }

  findTasksByStack(stackId: string): Array<Task> {
    let tasks = this.stackList.find((stack) => stack.id === stackId)?.taskList;
    return tasks === undefined ? [] : tasks.sort((task1, task2) => {
      if (task1.position! > task2.position!)
        return 1
      else
        return -1
    });
  }

  updateStackPosition(stack: Stack, side: string): void {
    let newPosition = side === "RIGHT" ? stack.position! + 1 : stack.position! - 1;
    this.workingAreaService.updateStackPosition(this.board.id!, stack.id!, newPosition).subscribe({
      next: (updatedStacks) => this.stackList = updatedStacks
    });
  }

  saveNewTaskStack(boardId: string, taskId: string, newStackId: string): void {
    this.workingAreaService.changeTaskStack(boardId, taskId, newStackId!).subscribe();
  }

  saveNewStack(): void {
    this.workingAreaService.saveNewStack(this.board.id!, new Stack(undefined, this.newStackName, undefined)).subscribe({
      complete: () => this.findBoard(this.board.id!)
    });
    this.changeInsertMode();
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
    }

    this.workingAreaService.updateTaskPosition(this.board.id!, this.draggedTask.id!, event.currentIndex, newStackId!).subscribe({
      complete: () => {
        this.findStacks(this.board.id!);
        this.clearDraggedTask();
      }
    });
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

  openModalNewTask(stackId?: string): void {
    const modal = this.modalService.open(ModalTaskComponent);
    modal.componentInstance.boardId = this.board.id;

    modal.componentInstance.screenAction = Action.INSERTING;
    modal.componentInstance.stackId = stackId;

    modal.closed.subscribe({ complete: () => this.findBoard(this.board.id!) });
  }

  openTaskDialog(task: Task): void {
    const dialog = this.matDialog.open(DialogTaskComponent, {
      data: {
        boardId: this.board.id,
        taskId: task.id
      }
    });
    dialog.afterClosed().subscribe({ complete: () => this.findBoard(this.board.id!) });
  }
}