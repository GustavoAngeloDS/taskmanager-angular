import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private backendUrl: string = environment.apiUrl + "/users/validateLogin";

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({ Authorization: "Basic " + btoa(username + ":" + password) })
    return this.httpClient.get<User>(this.backendUrl, { headers }).pipe(
      map(
        userData => {
          let authString = "Basic " + btoa(username + ":" + password);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem("basicauth", authString);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username")
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("basicauth")
  }
}
