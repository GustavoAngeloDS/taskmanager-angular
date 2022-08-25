import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/shared/models/board.model';
import { Stack } from 'src/app/shared/models/stack.model';
import { Task } from 'src/app/shared/models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkingAreaService {

  private baseBackendUrl: string = environment.apiUrl + "/boards/";

  constructor(private httpClient: HttpClient) { }

  findBoardById(boardId: string): Observable<Board> {
    return this.httpClient.get<Board>(this.baseBackendUrl + boardId);
  }

  findStacksByBoard(boardId: string): Observable<Array<Stack>> {
    return this.httpClient.get<Array<Stack>>(this.baseBackendUrl + boardId + "/stacks");
  }

  saveNewStack(boardId: string, stack: Stack): Observable<Stack> {
    return this.httpClient.post<Stack>(this.baseBackendUrl + boardId + "/stacks", {
      name: stack.name
    });
  }

  updateStack(boardId: string, stack: Stack): Observable<Stack> {
    return this.httpClient.put<Stack>(this.baseBackendUrl + boardId + "/stacks/" + stack.id, {
      name: stack.name
    });
  }

  changeTaskStack(boardId: string, taskId: string, newStackId: string): Observable<Task> {
    return this.httpClient.put<Task>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/change-stack/" + newStackId, {});
  }

  saveNewTask(boardId: string, stackId: string, task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseBackendUrl + boardId + "/stacks/" + stackId + "/tasks", {
      title: task.title,
      description: task.description
    });
  }

  updateTask(boardId: string, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.baseBackendUrl + boardId + "/tasks/" + task.id, {
      title: task.title,
      description: task.description
    })
  }
}
