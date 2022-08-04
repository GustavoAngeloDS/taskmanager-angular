import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { ModalBoardEditComponent } from './modal-board-edit/modal-board-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalBoardDeleteComponent } from './modal-board-delete/modal-board-delete.component';
import { ModalBoardInsertComponent } from './modal-board-insert/modal-board-insert.component';

@NgModule({
  declarations: [
    BoardListComponent,
    ModalBoardEditComponent,
    ModalBoardDeleteComponent,
    ModalBoardInsertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class BoardManagementModule { }
