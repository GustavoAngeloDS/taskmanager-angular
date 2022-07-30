import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardPanelComponent } from './board-panel/board-panel.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BoardPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule
  ]
})
export class WorkingAreaModule { }