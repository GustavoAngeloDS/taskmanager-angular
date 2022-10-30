import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardListComponent } from './board-management/board-list/board-list.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './user-management/login/login.component';
import { UserDetailsComponent } from './user-management/user-details/user-details.component';
import { BoardPanelComponent } from './working-area/board-panel/board-panel.component';
import { BoardAcceptInviteComponent } from './board-management/board-accept-invite/board-accept-invite.component';
import { PasswordGeneratorComponent } from './user-management/password-generator/password-generator.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    canActivate: [AuthGuard],
    path: "boards",
    component: BoardListComponent
  },
  {
    canActivate: [AuthGuard],
    path: "board-panel/:id",
    component: BoardPanelComponent
  },
  {
    canActivate: [AuthGuard],
    path: "userdetails",
    component: UserDetailsComponent
  },
  {
    path: "accept-invite/:invitationId",
    component: BoardAcceptInviteComponent
  },
  {
    path: "reset-password/:passwordResetRequestId",
    component: PasswordGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }