import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {

  dialogId!: string;
  user: User = new User();

  constructor(private matDialog: MatDialog, private notificationService: NotificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.user.email! = "";
  }

  sendRecuperationEmail() {
    this.userService.requestPasswordReset(this.user.email!).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Caso o e-mail informado faça parte da plataforma TaskManager, um e-mail será enviado com instruções para a troca de senha");
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }

}
