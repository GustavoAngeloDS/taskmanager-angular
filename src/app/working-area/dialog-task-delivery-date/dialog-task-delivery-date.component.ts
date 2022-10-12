import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-dialog-task-delivery-date',
  templateUrl: './dialog-task-delivery-date.component.html',
  styleUrls: ['./dialog-task-delivery-date.component.css']
})
export class DialogTaskDeliveryDateComponent implements OnInit {
  task!: Task;
  dialogId!: string;
  color: ThemePalette = "warn";

  availableNotificationTimes: Array<string> = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00",
    "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
    "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
    "23:00", "23:30"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private notificationService: NotificationService,
    private workingAreaService: WorkingAreaService) {
  }

  ngOnInit(): void {
    this.findTask();
  }

  private findTask() {
    this.workingAreaService.findTaskById(this.data.boardId, this.data.taskId).subscribe({
      next: (task) => this.task = task
    });
  }

  updateDeliveryDate() {
    this.clearDeliveryDateWhenInactive();
    this.workingAreaService.updateTaskDeliveryDate(this.data.boardId, this.data.taskId, this.task.deliveryDate!).subscribe({
      error: (error) => this.notificationService.showError("Falha ao salvar data de entrega: " + error),
      complete: () => {
        this.notificationService.showSuccess("Data de entrega alterada");
        this.matDialog.getDialogById(this.dialogId)?.close()
      }
    });
  }

  clearDeliveryDateWhenInactive() {
    if (!this.task.deliveryDate?.active) this.task.deliveryDate!.date = undefined
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)?.close();
  }

  initialDate(): Date {
    console.log(this.task.deliveryDate!.date!)
    return new Date(this.task.deliveryDate!.date!)
  }
}