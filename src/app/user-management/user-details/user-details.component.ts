import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from 'src/app/shared/enums/action';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent extends PageBehavior implements OnInit {
  fieldSetDisabled: boolean = true;
  Action = Action;
  user!: User;

  constructor(private sessionService: SessionService, private userService: UserService, private notificationService: NotificationService) {
    super(true, Action.VIEWING);
    this.findUser();
  }

  findUser() {
    this.userService.findUser(this.sessionService.loggedUser.id!).subscribe({
      next: (user: User) => this.user = user
    })
  }

  ngOnInit(): void {
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(
      () => { },
      (error) => this.notificationService.showError("Falha ao salvar dados"),
      () => { this.refreshPage(), this.sessionService.updateLoggedUser(this.user) },
    );
  }

  editMode() {
    this.fieldSetDisabled = false;
    this.currentAction = Action.EDITING
  }

  refreshPage() {
    window.location.reload();
  }
}
