import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  user: User = new User();
  requestId!: string;

  constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params['passwordResetRequestId'];
  }

  updatePassword() {
    this.userService.updatePassword(this.requestId, this.user.password!).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Senha alterada com sucesso")
        this.redirectToLoginPageInSeconds(2)
      },
      error: (error) => {
        this.notificationService.showError("Falha ao atualizar senha: [" + error.error.message + "]");
        this.notificationService.showWarning("Você será redirecionado para a página de login onde será possível solicitar outra restauração de senha");
        console.error(error);
        this.redirectToLoginPageInSeconds(6);
      }
    });

    this.user = new User();
  }

  async redirectToLoginPageInSeconds(seconds: number) {
    await new Promise(f => setTimeout(f, seconds * 1000));
    this.router.navigate(["/login"]);
  }
}
