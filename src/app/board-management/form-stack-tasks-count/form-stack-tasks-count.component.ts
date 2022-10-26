import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ChartConfiguration } from 'chart.js';
import { StackTasksCount } from 'src/app/shared/models/form/stack-tasks-count.model';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-form-stack-tasks-count',
  templateUrl: './form-stack-tasks-count.component.html',
  styleUrls: ['./form-stack-tasks-count.component.css']
})
export class FormStackTasksCountComponent implements OnInit {

  dialogId!: string;
  stackTasksCountArray!: Array<StackTasksCount>;
  completed: boolean = false;

  public barChartLegend = true;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public barChartData!: ChartConfiguration<'bar'>['data'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.getFormData();
  }

  processFormData() {
    let arrayLabel: Array<string> = [];
    let arrayData: Array<number> = [];

    for (let index = 0; index < this.stackTasksCountArray.length; index++) {
      arrayLabel.push(this.stackTasksCountArray[index].stackName!);
      arrayData.push(this.stackTasksCountArray[index].tasksCount!);
    }

    this.barChartData = {
      labels: arrayLabel,
      datasets: [{
        data: arrayData,
        label: "Tarefas"
      }]
    }

    this.completed = true;
  }

  getFormData() {
    this.reportService.findStackTasksCount(this.data.boardId!).subscribe({
      next: (stackTasksCountArray: Array<StackTasksCount>) => this.stackTasksCountArray = stackTasksCountArray,
      error: (error) => console.log(error),
      complete: () => this.processFormData()
    });
  }
}