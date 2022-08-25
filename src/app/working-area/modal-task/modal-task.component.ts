import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Action } from 'src/app/shared/enums/action';
import { Task } from 'src/app/shared/models/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})
export class ModalTaskComponent implements OnInit {

  @Input() screenAction!: Action;
  Action = Action

  @Input() boardId!: string;
  @Input() task!: Task;
  @Input() stackId!: string;

  newTask!: Task;

  constructor(private workingAreaService: WorkingAreaService, public activeModal: NgbActiveModal, public notificationService: NotificationService) {
    this.task = new Task();
    this.newTask = new Task();
  }

  ngOnInit(): void {
  }

  salvarTask(): void {
    if (this.screenAction == Action.EDITING) {
      this.workingAreaService.updateTask(this.boardId, this.task!).subscribe({
        complete: () => {
          this.notificationService.showSuccess("Task atualizada");
          this.activeModal.close();
        },
        error: (error) => this.notificationService.showError(error.message)
      });
    } else {
      this.workingAreaService.saveNewTask(this.boardId, this.stackId, this.newTask).subscribe({
        complete: () => {
          this.notificationService.showSuccess("Task criada com sucesso");
          this.activeModal.close();
        },
        error: (error) => this.notificationService.showError(error.message)
      });
    }
  }
}
