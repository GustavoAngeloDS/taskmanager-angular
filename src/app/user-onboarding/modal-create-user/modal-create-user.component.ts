import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.css']
})
export class ModalCreateUserComponent implements OnInit {

  newUser!: User;

  constructor(public activeModal: NgbActiveModal, private notificationService: NotificationService, private userService: UserService) {
    this.newUser = new User();
  }

  ngOnInit(): void {
  }

  saveNewUser() {
    console.log(this.newUser);
    this.userService.saveUser(this.newUser).subscribe({
      error: (error) => {
        this.notificationService.showError(
          "Falha ao criar novo usuário. Tente novamente em alguns minutos [" + error + "]")
      },
      complete: () => {
        this.notificationService.showSuccess("Usuário cadastrado com sucesso!");
        this.activeModal.close();
      }
    });
  }
}