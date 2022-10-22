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
import { DialogFormTabComponent } from './dialog-form-tab/dialog-form-tab.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { FormStackTasksCountComponent } from './form-stack-tasks-count/form-stack-tasks-count.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    BoardAcceptInviteComponent,
    DialogFormTabComponent,
    FormStackTasksCountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    NgChartsModule,
    MatTabsModule,
    BrowserAnimationsModule
  ]
})
export class BoardManagementModule { }
