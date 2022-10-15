import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'src/app/shared/enums/action';
import { InternalTask } from 'src/app/shared/models/internal-task.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { Tag } from 'src/app/shared/models/tag.model';
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
  availableTags!: Array<Tag>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private notificationService: NotificationService, private workingAreaService: WorkingAreaService) {
    super(true, Action.VIEWING);
    this.task = new Task();
  }

  ngOnInit(): void {
    this.findTask();
    this.findBoardTags();
  }

  private findTask() {
    this.workingAreaService.findTaskById(this.data.boardId, this.data.taskId).subscribe({
      next: (task) => this.setTaskAndInternalTasks(task)
    })
  }

  private findBoardTags() {
    this.workingAreaService.findAllTagsByBoardId(this.data.boardId).subscribe({
      next: (tagList: Array<Tag>) => this.availableTags = tagList
    });
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

  completeTask(): void {
    this.task.deliveryDate!.accomplished = true;
    this.workingAreaService.updateTaskDeliveryDate(this.data.boardId, this.task.id!, this.task.deliveryDate!).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Data de entrega atendida")
        this.findTask()
      }
    });
  }

  isDeliveryOverdue(): boolean {
    let todayDate = (new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).substring(0, 10).replace("/", "-")).replace("/", "-");
    let deliveryDate = this.task.deliveryDate!.date!.toString().replace("-", "").replace("-", "");
    deliveryDate = deliveryDate.substring(deliveryDate.length - 2) + "-" + deliveryDate.substring(4, 6) + "-" + deliveryDate.substring(0, 4)

    var currentTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).slice(10).substring(0, 6).trim();

    return ((deliveryDate < todayDate) || (deliveryDate == todayDate && this.task.deliveryDate!.time! < currentTime)) && !this.task.deliveryDate!.accomplished!;
  }
}