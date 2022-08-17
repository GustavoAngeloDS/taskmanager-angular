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

  private backendUrl: string = environment.apiUrl + "/users/";

  constructor(private authenticationService: AuthenticationService, private httpClient: HttpClient) { }

  loginUser(username: string, password: string): Observable<User> {
    return this.authenticationService.authenticate(username, password);
  }
}
