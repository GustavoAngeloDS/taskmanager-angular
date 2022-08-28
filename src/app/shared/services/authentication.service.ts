import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private backendUrl: string = environment.apiUrl + "/users/validateLogin";

  constructor(private router: Router, private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({ Authorization: "Basic " + btoa(username + ":" + password) })

    return this.httpClient.get<User>(this.backendUrl, { headers }).pipe(
      map(
        userData => {
          let authString = "Basic " + btoa(username + ":" + password);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem("basicauth", authString);
          sessionStorage.setItem("user", JSON.stringify(userData));
          return userData;
        }
      )
    )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username")
    return !(user === null)
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
