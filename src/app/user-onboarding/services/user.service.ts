import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl: string = environment.apiUrl + "/users";

  constructor(private httpClient: HttpClient) { }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put(this.backendUrl + "/" + user.id, {
      nickName: user.nickName,
      phoneNumber: user.phoneNumber
    });
  }

  findUser(userId: string): Observable<User> {
    return this.httpClient.get(this.backendUrl + userId);
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post(this.backendUrl, {
      email: user.email,
      username: user.username,
      nickName: user.nickName,
      phoneNumber: user.phoneNumber,
      password: user.password
    });
  }
}
