import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'src/app/shared/enums/action';
import { Board } from 'src/app/shared/models/board.model';
import { InternalTask } from 'src/app/shared/models/internal-task.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { Task } from 'src/app/shared/models/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogTaskDeliveryDateComponent } from '../dialog-task-delivery-date/dialog-task-delivery-date.component';
import { DialogTaskMembersComponent } from '../dialog-task-members/dialog-task-members.component';
import { DialogTaskNotifConfigComponent } from '../dialog-task-notif-config/dialog-task-notif-config.component';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent extends PageBehavior implements OnInit {
  task!: Task;
  internalTasks!: Array<InternalTask>;

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
      next: (task) => this.setTaskAndInternalTasks(task),
      complete: () => console.log(this.isDateOverdue())
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
      next: (task: Task) => {
        this.setTaskAndInternalTasks(task)
      },
      complete: () => this.calcPercentage(),
      error: (error) => this.notificationService.showError("Falha ao atualizar tarefa interna: " + error)
    });
  }

  updateInternalTaskPosition(internalStackId: string, newPosition: number): void {
    this.workingAreaService.updateInternalTaskPosition(this.data.boardId, this.task.id!, internalStackId, newPosition).subscribe({
      next: (task: Task) => this.setTaskAndInternalTasks(task)
    });
  }

  isLastInternalTaskInArray(internalTaskId: string): boolean {
    let isLastInArray: boolean = false;
    for (let i = 0; i < this.internalTasks.length; i++) {
      if (this.internalTasks[i].id! == internalTaskId && i == this.internalTasks.length - 1)
        isLastInArray = true;
    }
    return isLastInArray;
  }

  isFirstInternalTaskInArray(internalTaskId: string): boolean {
    let isLastInArray: boolean = false;
    for (let i = 0; i < this.internalTasks.length; i++) {
      if (this.internalTasks[i].id! == internalTaskId && i == 0)
        isLastInArray = true;
    }
    return isLastInArray;
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
            this.setTaskAndInternalTasks(task);
            this.calcPercentage();
          }
        });
        this.newInternalTask = new InternalTask();
      },
      error: (error) => this.notificationService.showError("Falha ao inserir nova tarefa interna:" + error.message)
    });
  }

  setTaskAndInternalTasks(task: Task) {
    this.task = task;
    this.internalTasks = task.internalTasks!;
  }

  removeInternalTask(internalTaskId: string) {
    this.workingAreaService.removeInternalTask(this.data.boardId, this.task.id!, internalTaskId).subscribe({
      complete: () => this.findTask()
    })
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

  openTaskDeliveryDateDialog() {
    const dialog = this.matDialog.open(DialogTaskDeliveryDateComponent,
      {
        data: {
          boardId: this.data.boardId,
          taskId: this.task.id
        }
      });
    dialog.componentInstance.dialogId = dialog.id;
    dialog.afterClosed().subscribe({
      complete: () => this.findTask()
    })
  }

  openaskNotificationConfigurationDialog() {
    const dialog = this.matDialog.open(DialogTaskNotifConfigComponent,
      {
        data: {
          boardId: this.data.boardId,
          taskId: this.task.id
        }
      });
    dialog.componentInstance.dialogId = dialog.id;
  }

  isDateOverdue(): boolean {
    var todayDate = new Date().toISOString().slice(0, 10);
    return new Date(this.task.deliveryDate!.date!) < new Date(todayDate);
  }
}