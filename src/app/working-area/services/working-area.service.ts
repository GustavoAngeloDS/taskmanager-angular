import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/shared/models/board.model';
import { DeliveryDate } from 'src/app/shared/models/delivery-date.model';
import { InternalTask } from 'src/app/shared/models/internal-task.model';
import { NotificationConfiguration } from 'src/app/shared/models/notification-configuration.model';
import { Stack } from 'src/app/shared/models/stack.model';
import { Tag } from 'src/app/shared/models/tag.model';
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

  updateStackPosition(boardId: string, stackId: string, newPosition: number): Observable<Array<Stack>> {
    return this.httpClient.put<Array<Stack>>(this.baseBackendUrl + boardId + "/stacks/" + stackId + "/" + "update-stack-position/" + newPosition, {});
  }

  changeTaskStack(boardId: string, taskId: string, newStackId: string): Observable<Task> {
    return this.httpClient.put<Task>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/change-stack/" + newStackId, {});
  }

  updateTaskPosition(boardId: string, taskId: string, newPosition: number, newStackId: string): Observable<Array<Task>> {
    return this.httpClient.put<Array<Task>>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/update-task-position/" + newPosition + "/" + newStackId, {});
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

  updateInternalTask(boardId: string, taskId: string, internalTask: InternalTask): Observable<Task> {
    return this.httpClient.put<Task>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/internalTasks/" + internalTask.id, {
      checked: internalTask.checked,
      description: internalTask.description,
      position: internalTask.position
    });
  }

  saveNewInternalTask(boardId: string, taskId: string, internalTask: InternalTask): Observable<Task> {
    return this.httpClient.post<Task>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/internalTasks", {
      checked: false,
      description: internalTask.description
    });
  }

  updateInternalTaskPosition(boardId: string, taskId: string, internalTaskId: string, newPosition: number): Observable<Task> {
    return this.httpClient.put<InternalTask>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/internalTasks/" + internalTaskId + "/update-position/" + newPosition, {});
  }

  removeInternalTask(boardId: string, taskId: string, internalTaskId: string): Observable<void> {
    return this.httpClient.delete<void>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/internalTasks/" + internalTaskId);
  }

  findTaskById(boardId: string, taskId: string): Observable<Task> {
    return this.httpClient.get<Task>(this.baseBackendUrl + boardId + "/tasks/" + taskId);
  }

  updateTaskMemberList(boardId: string, taskId: string, memberIdList: Array<string>): Observable<Task> {
    let request: string = "";
    memberIdList.forEach((memberId) => {
      request += "{\"id\": \"" + memberId + "\"},";
    })
    request = "[" + request.substring(0, request.length - 1) + "]";
    return this.httpClient.post<Task>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/updateMemberList", JSON.parse(request))
  }

  updateTaskDeliveryDate(boarId: string, taskId: string, deliveryDate: DeliveryDate): Observable<Task> {
    return this.httpClient.put<DeliveryDate>(this.baseBackendUrl + boarId + "/tasks/" + taskId + "/deliveryDate", {
      active: deliveryDate.active,
      date: deliveryDate.date,
      accomplished: deliveryDate.accomplished,
      time: deliveryDate.time
    });
  }

  updateTaskNotificationConfiguration(boardId: string, taskId: string, notificationConfiguration: NotificationConfiguration): Observable<Task> {
    return this.httpClient.put<NotificationConfiguration>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/notificationConfiguration", {
      notificationType: notificationConfiguration.notificationType,
      title: notificationConfiguration.title,
      message: notificationConfiguration.message
    });
  }

  findAllTagsByBoardId(boardId: string): Observable<Array<Tag>> {
    return this.httpClient.get<Array<Tag>>(this.baseBackendUrl + boardId + "/tags");
  }

  saveNewTag(boardId: string, tag: Tag): Observable<Tag> {
    return this.httpClient.post<Tag>(this.baseBackendUrl + boardId + "/tags", {
      name: tag.name
    });
  }

  updateTag(boardId: string, tagId: string, tag: Tag): Observable<Tag> {
    return this.httpClient.put<Tag>(this.baseBackendUrl + boardId + "/tags/" + tagId, {
      name: tag.name
    });
  }

  removeTag(boardId: string, tagId: string): Observable<void> {
    return this.httpClient.delete<void>(this.baseBackendUrl + boardId + "/tags/" + tagId)
  }

  updateTaskTag(boardId: string, taskId: string, tagId: string): Observable<Task> {
    return this.httpClient.put<Task>(this.baseBackendUrl + boardId + "/tasks/" + taskId + "/update-tag/" + tagId, {});
  }
}
