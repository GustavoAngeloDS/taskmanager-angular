import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { ModalBoardDetailsComponent } from './modal-board-details/modal-board-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalBoardDeleteComponent } from './modal-board-delete/modal-board-delete.component';
import { ModalBoardInsertComponent } from './modal-board-insert/modal-board-insert.component';
import { BoardEditComponent } from './board-edit/board-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BoardListComponent,
    ModalBoardDetailsComponent,
    ModalBoardDeleteComponent,
    ModalBoardInsertComponent,
    BoardEditComponent
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
