import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/shared/models/board.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardManagementService {

  private backendUrl: string = environment.apiUrl + "/boards";

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Array<Board>> {
    return this.httpClient.get<Array<Board>>(this.backendUrl);
  }

  removeBoard(board: Board): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl, {
      body: {
        id: board.id,
        name: board.name,
        description: board.description
      }
    });
  }

  updateBoard(board: Board): Observable<Board> {
    return this.httpClient.put<Board>(this.backendUrl, {
      id: board.id,
      name: board.name,
      description: board.description
    })
  }

  saveBoard(board: Board): Observable<Board> {
    return this.httpClient.post<Board>(this.backendUrl, {
      name: board.name,
      description: board.description,
      owner: new User(1, "gustavoteste@gmail.co2m", "teste2", "Gustaveira", "4155446633")
    });
  }
}
