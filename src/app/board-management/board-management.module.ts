import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { ModalBoardEditComponent } from './modal-board-edit/modal-board-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardListComponent,
    ModalBoardEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BoardManagementModule { }
