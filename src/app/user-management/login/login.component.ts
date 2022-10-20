import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { DialogCreateUserComponent } from '../dialog-create-user/dialog-create-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;

  user!: User;

  constructor(private matDialog: MatDialog, private sessionService: SessionService, private notificationService: NotificationService, private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(["/boards"])
    }

    this.user = new User();
  }

  ngOnInit(): void {

  }

  login() {
    this.authenticationService.authenticate(this.user.username!, this.user.password!).subscribe({
      next: (user: User) => {
        if (user != null && user != undefined) {
          this.sessionService.loggedUser = user;
          this.router.navigate(["/boards"]);
        }
      },
      error: (error) => this.notificationService.showError("Não foi possível logar com as credenciais informadas")
    });
  }

  openModalNewUser(): void {
    const dialog = this.matDialog.open(DialogCreateUserComponent);
    dialog.componentInstance.dialogId = dialog.id;
  }
}
