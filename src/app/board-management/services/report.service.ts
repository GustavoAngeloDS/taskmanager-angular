import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StackTasksCount } from 'src/app/shared/models/form/stack-tasks-count.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private backendUrl: string = environment.apiUrl + "/reports";

  constructor(private httpClient: HttpClient) { }

  findStackTasksCount(boardId: string): Observable<Array<StackTasksCount>> {
    return this.httpClient.get<Array<StackTasksCount>>(this.backendUrl + "/boardId/" + boardId + "/find-stack-tasks-count");
  }
}