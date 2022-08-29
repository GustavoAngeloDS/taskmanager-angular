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
  @ViewChild('formUserDetails') formUserDetails!: NgForm;
  fieldSetDisabled: boolean = true;

  Action = Action;

  user!: User;

  constructor(private router: Router, private sessionService: SessionService, private userService: UserService, private notificationService: NotificationService) {
    super(true, Action.VIEWING);
    /*TODO: Inicializar a tela com o retorno do usuário logado pelo endpoint (usar o usersession apenas para filtrar pelo ID do usuário) */
    this.user = sessionService.loggedUser;
  }

  ngOnInit(): void {
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(
      () => { },
      (error) => this.notificationService.showError("Falha ao salvar dados"),
      () => { this.viewingMode(), this.sessionService.updateLoggedUser(this.user) },
    );
  }

  editMode() {
    this.fieldSetDisabled = false;
    this.currentAction = Action.EDITING
  }

  viewingMode() {
    this.fieldSetDisabled = true;
    this.currentAction = Action.VIEWING;
    this.router.navigate(["/userdetails"]);
  }
}
