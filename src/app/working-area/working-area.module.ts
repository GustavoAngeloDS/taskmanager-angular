import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardPanelComponent } from './board-panel/board-panel.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalStackEditComponent } from './modal-stack-edit/modal-stack-edit.component';
import { ModalTaskComponent } from './modal-task/modal-task.component';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';

@NgModule({
  declarations: [
    BoardPanelComponent,
    ModalStackEditComponent,
    ModalTaskComponent,
    DialogTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    HttpClientModule
  ]
})
export class WorkingAreaModule { }