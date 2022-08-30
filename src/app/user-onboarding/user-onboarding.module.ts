import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ModalCreateUserComponent } from './modal-create-user/modal-create-user.component';



@NgModule({
  declarations: [
    LoginComponent,
    UserDetailsComponent,
    ModalCreateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ]
})
export class UserOnboardingModule { }
