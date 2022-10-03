import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationType } from 'src/app/shared/enums/notification-type';
import { Task } from 'src/app/shared/models/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-task-notif-config',
  templateUrl: './dialog-task-notif-config.component.html',
  styleUrls: ['./dialog-task-notif-config.component.css']
})
export class DialogTaskNotifConfigComponent implements OnInit {

  dialogId!: string;
  task!: Task;
  notificationTypeEnum = NotificationType;
  notificationTypes: Array<string> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private notificationService: NotificationService, private workingAreaService: WorkingAreaService) {
    this.notificationTypes = Object.keys(this.notificationTypeEnum);
  }

  ngOnInit(): void {
    this.findTask();
  }

  findTask() {
    this.workingAreaService.findTaskById(this.data.boardId, this.data.taskId).subscribe({
      next: (task) => this.task = task,
      error: (error) => this.notificationService.showError("Falha ao buscar tarefa: " + error.error)
    });
  }

  updateNotificationConfiguration() {
    this.workingAreaService.updateTaskNotificationConfiguration(this.data.boardId, this.data.taskId, this.task.notificationConfiguration!).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Configurações da notificação alteradas");
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)?.close();
  }
}
