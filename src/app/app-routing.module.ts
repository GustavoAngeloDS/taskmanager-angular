import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogBoardEditComponent } from './board-management/dialog-board-edit/dialog-board-edit.component';
import { BoardListComponent } from './board-management/board-list/board-list.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './user-management/login/login.component';
import { UserDetailsComponent } from './user-management/user-details/user-details.component';
import { BoardPanelComponent } from './working-area/board-panel/board-panel.component';

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
    canActivate: [AuthGuard],
    path: "board-edit/:id",
    component: DialogBoardEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }