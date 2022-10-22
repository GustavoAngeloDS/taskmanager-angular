import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { ModalBoardDetailsComponent } from './modal-board-details/modal-board-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DialogBoardDeleteComponent } from './dialog-board-delete/dialog-board-delete.component';
import { DialogBoardInsertComponent } from './dialog-board-insert/dialog-board-insert.component';
import { DialogBoardEditComponent } from './dialog-board-edit/dialog-board-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogGeneralManagementComponent } from './dialog-general-management/dialog-general-management.component';
import { DialogMembersManagementComponent } from './dialog-members-management/dialog-members-management.component';
import { DialogMemberDeleteComponent } from './dialog-member-delete/dialog-member-delete.component';
import { BoardAcceptInviteComponent } from './board-accept-invite/board-accept-invite.component';


@NgModule({
  declarations: [
    BoardListComponent,
    ModalBoardDetailsComponent,
    DialogBoardDeleteComponent,
    DialogBoardInsertComponent,
    DialogBoardEditComponent,
    DialogGeneralManagementComponent,
    DialogMembersManagementComponent,
    DialogMemberDeleteComponent,
    BoardAcceptInviteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class BoardManagementModule { }
