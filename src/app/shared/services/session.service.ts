import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  loggedUser!: User

  constructor() {
    if (sessionStorage.getItem("user") !== null) {
      this.loggedUser = JSON.parse(sessionStorage.getItem("user")!);
    }
  }
}
