import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ModalCreateUserComponent } from '../modal-create-user/modal-create-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;

  username?: string;
  password?: string;

  constructor(private modalService: NgbModal, private sessionService: SessionService, private notificationService: NotificationService, private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(["/boards"])
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.authenticate(this.username!, this.password!).subscribe((user) => {
      if (user != null && user != undefined) {
        this.sessionService.loggedUser = user;
        this.router.navigate(["/boards"]);
      }
    }, (error) => this.notificationService.showError("Não foi possível logar com as credenciais informadas"));
  }

  openModalNewUser(): void {
    this.modalService.open(ModalCreateUserComponent);
  }
}
