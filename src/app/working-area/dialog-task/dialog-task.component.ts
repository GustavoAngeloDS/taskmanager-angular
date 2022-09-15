import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action } from 'src/app/shared/enums/action';
import { InternalTask } from 'src/app/shared/models/internal-task.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { Task } from 'src/app/shared/models/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogTaskMembersComponent } from '../dialog-task-members/dialog-task-members.component';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent extends PageBehavior implements OnInit {

  boardId!: string;
  task!: Task;
  percentComplete: number = 0;

  Action = Action;

  newInternalTask!: InternalTask;

  constructor(private matDialog: MatDialog, private notificationService: NotificationService, private workingAreaService: WorkingAreaService) {
    super(true, Action.VIEWING);
    this.task = new Task();
  }

  ngOnInit(): void {
    this.newInternalTask = new InternalTask();
    this.updatePercentage();
  }

  updateTask() {
    this.workingAreaService.updateTask(this.boardId, this.task).subscribe({
      complete: () => { },
      error: (error) => this.notificationService.showError("Erro ao atualizar Task: " + error.message)
    })
  }

  updateInternalTasks(internalTask: InternalTask): void {
    this.workingAreaService.updateInternalTask(this.boardId, this.task.id!, internalTask).subscribe({
      complete: () => this.updatePercentage(),
      error: (error) => this.notificationService.showError("Falha ao atualizar tarefa interna: " + error)
    });
  }

  updatePercentage(): void {
    this.percentComplete = Math.trunc((this.task.internalTasks!.filter((internalTask) => internalTask.checked == true).length / this.task.internalTasks!.length) * 100);
  }

  saveNewInternalTask(): void {
    if (this.newInternalTask.description == null || this.newInternalTask.description.trim() == "") {
      this.currentAction = Action.VIEWING;
      return;
    }
    this.workingAreaService.saveNewInternalTask(this.boardId, this.task.id!, this.newInternalTask!).subscribe({
      complete: () => {
        this.currentAction = Action.VIEWING;
        this.workingAreaService.findTaskById(this.boardId, this.task.id!).subscribe({
          next: (task) => {
            this.task = task;
            this.updatePercentage();
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
    const dialog = this.matDialog.open(DialogTaskMembersComponent);
    
  }
}
