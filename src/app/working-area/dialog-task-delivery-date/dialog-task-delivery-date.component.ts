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
      error: (error) => this.notificationService.showError("Falha ao salvar data de vencimento: " + error),
      complete: () => {
        this.notificationService.showSuccess("Data de vencimento alterada");
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
    if (this.task.deliveryDate!.date == undefined)
      return new Date();
    else
      return this.task.deliveryDate!.date;
  }
}