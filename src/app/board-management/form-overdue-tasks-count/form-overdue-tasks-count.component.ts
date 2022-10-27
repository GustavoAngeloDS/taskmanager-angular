import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ChartConfiguration } from 'chart.js';
import { OverdueTasksCount } from 'src/app/shared/models/form/overdue-tasks-count.model';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-form-overdue-tasks-count',
  templateUrl: './form-overdue-tasks-count.component.html',
  styleUrls: ['./form-overdue-tasks-count.component.css']
})
export class FormOverdueTasksCountComponent implements OnInit {

  dialogId!: string;
  overdueTasksCountArray!: Array<OverdueTasksCount>;
  completed: boolean = false;

  public pieChartLegend = true;

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: false
  };

  public pieChartData!: ChartConfiguration<'pie'>['data'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private reportService: ReportService) { }

  ngOnInit(): void {
    this.getFormData();
  }

  processFormData() {
    let arrayLabel: Array<string> = [];
    let arrayData: Array<number> = [];

    for (let index = 0; index < this.overdueTasksCountArray.length; index++) {
      arrayLabel.push(this.overdueTasksCountArray[index].stackName!);
      arrayData.push(this.overdueTasksCountArray[index].tasksCount!);
    }

    this.pieChartData = {
      labels: arrayLabel,
      datasets: [{
        data: arrayData,
        label: "Tarefas atrasadas"
      }]
    }

    this.completed = true;
  }

  getFormData() {
    this.reportService.findOverdueTasksCount(this.data.boardId!).subscribe({
      next: (overdueTasks: Array<OverdueTasksCount>) => this.overdueTasksCountArray = overdueTasks,
      error: (error) => console.log(error),
      complete: () => this.processFormData()
    });
  }
}
