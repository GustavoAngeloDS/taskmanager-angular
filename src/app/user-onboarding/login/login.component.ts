import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;

  username?: string;
  password?: string;

  constructor(private notificationService: NotificationService, private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(["/boards"])
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.authenticate(this.username!, this.password!).subscribe((user) => {
      if (user != null && user != undefined) {
        this.router.navigate(["/boards"]);
      }
    }, (error) => this.notificationService.showError("Não foi possível logar com as credenciais informadas")
    );
  }
}
