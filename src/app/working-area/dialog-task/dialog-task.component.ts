import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent implements OnInit {

  task!: Task;

  constructor() {
    this.task = new Task();
  }

  ngOnInit(): void {
  }
}
