import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardPanelComponent } from './board-panel/board-panel.component';

@NgModule({
  declarations: [
    BoardPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class WorkingAreaModule { }