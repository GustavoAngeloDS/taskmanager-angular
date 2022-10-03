import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DialogCreateUserComponent } from './dialog-create-user/dialog-create-user.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    LoginComponent,
    UserDetailsComponent,
    DialogCreateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    UserService
  ]
})
export class UserManagementModule { }
