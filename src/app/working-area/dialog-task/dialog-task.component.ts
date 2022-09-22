import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'src/app/shared/enums/action';
import { Board } from 'src/app/shared/models/board.model';
import { InternalTask } from 'src/app/shared/models/internal-task.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { Task } from 'src/app/shared/models/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogTaskDuedateComponent } from '../dialog-task-duedate/dialog-task-duedate.component';
import { DialogTaskMembersComponent } from '../dialog-task-members/dialog-task-members.component';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent extends PageBehavior implements OnInit {
  task!: Task;

  Action = Action;

  newInternalTask: InternalTask = new InternalTask();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private notificationService: NotificationService, private workingAreaService: WorkingAreaService) {
    super(true, Action.VIEWING);
    this.task = new Task();
  }

  ngOnInit(): void {
    this.findTask();
  }

  private findTask() {
    this.workingAreaService.findTaskById(this.data.boardId, this.data.taskId).subscribe({
      next: (task) => this.task = task
    })
  }

  updateTask() {
    this.workingAreaService.updateTask(this.data.boardId, this.task).subscribe({
      complete: () => { },
      error: (error) => this.notificationService.showError("Erro ao atualizar Task: " + error.message)
    })
  }

  updateInternalTasks(internalTask: InternalTask): void {
    this.workingAreaService.updateInternalTask(this.data.boardId, this.task.id!, internalTask).subscribe({
      complete: () => this.calcPercentage(),
      error: (error) => this.notificationService.showError("Falha ao atualizar tarefa interna: " + error)
    });
  }

  calcPercentage(): number {
    return Math.trunc((this.task.internalTasks!.filter((internalTask) => internalTask.checked == true).length / this.task.internalTasks!.length) * 100);
  }

  saveNewInternalTask(): void {
    if (this.newInternalTask.description == null || this.newInternalTask.description.trim() == "") {
      this.currentAction = Action.VIEWING;
      return;
    }
    this.workingAreaService.saveNewInternalTask(this.data.boardId, this.task.id!, this.newInternalTask!).subscribe({
      complete: () => {
        this.currentAction = Action.VIEWING;
        this.workingAreaService.findTaskById(this.data.boardId, this.task.id!).subscribe({
          next: (task) => {
            this.task = task;
            this.calcPercentage();
          }
        });
        this.newInternalTask = new InternalTask();
      },
      error: (error) => this.notificationService.showError("Falha ao inserir nova tarefa interna:" + error.message)
    });
  }

  allowCreateNewInternalTask(): void {
    this.currentAction = Action.INSERTING;
  }

  openTaskMembersDialog() {
    const dialog = this.matDialog.open(DialogTaskMembersComponent, {
      data: {
        boardId: this.data.boardId,
        taskId: this.task.id
      }
    });
    dialog.componentInstance.dialogId = dialog.id;
  }

  openTaskDueDateDialog() {
    const dialog = this.matDialog.open(DialogTaskDuedateComponent,
      {
        disableClose: true,
        data: {
          boardId: this.data.boardId,
          taskId: this.task.id
        }
      });
    dialog.componentInstance.dialogId = dialog.id;
  }
}