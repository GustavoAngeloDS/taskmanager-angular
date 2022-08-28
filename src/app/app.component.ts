import { Component, OnInit } from '@angular/core';
import { User } from '../app/shared/models/user.model';
import { PageBehavior } from './shared/models/internal/page-behavior.model';
import { AuthenticationService } from './shared/services/authentication.service';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TaskManager';

  constructor(private authenticationService: AuthenticationService) {

  }
  ngOnInit(): void {

  }

  isUserLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  logout() {
    this.authenticationService.logOut();
  }
}