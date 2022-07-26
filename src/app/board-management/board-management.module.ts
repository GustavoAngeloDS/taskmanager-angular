import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardEditComponent } from './board-edit/board-edit.component';



@NgModule({
  declarations: [
    BoardListComponent,
    BoardEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BoardManagementModule { }
