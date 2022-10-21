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
    this.workingAreaService.saveNewTask(this.boardId, this.stackId, this.newTask).subscribe({
      next: (task: Task) => this.newTask = task,
      complete: () => {
        this.notificationService.showSuccess("Task criada com sucesso");
        this.activeModal.close(this.newTask);
      },
      error: (error) => this.notificationService.showError(error.message)
    });
  }
}
