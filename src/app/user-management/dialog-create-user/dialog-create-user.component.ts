import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-create-user',
  templateUrl: './dialog-create-user.component.html',
  styleUrls: ['./dialog-create-user.component.css']
})
export class DialogCreateUserComponent implements OnInit {

  @ViewChild('formNewUser')
  formNewUser!: NgForm;

  newUser!: User;
  dialogId!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private notificationService: NotificationService, private userService: UserService) {
    this.newUser = new User();
  }

  ngOnInit(): void {
  }

  saveNewUser() {
    this.userService.saveUser(this.newUser).subscribe({
      error: (error) => {
        this.notificationService.showError(
          "Falha ao criar novo usuário. Tente novamente em alguns minutos [" + error.message + "]")
      },
      complete: () => {
        this.notificationService.showSuccess("Usuário cadastrado com sucesso!");
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }
}