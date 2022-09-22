import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardPanelComponent } from './board-panel/board-panel.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalStackEditComponent } from './modal-stack-edit/modal-stack-edit.component';
import { ModalTaskComponent } from './modal-task/modal-task.component';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { DialogTaskMembersComponent } from './dialog-task-members/dialog-task-members.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DialogTaskDuedateComponent } from './dialog-task-duedate/dialog-task-duedate.component';

@NgModule({
  declarations: [
    BoardPanelComponent,
    ModalStackEditComponent,
    ModalTaskComponent,
    DialogTaskComponent,
    DialogTaskMembersComponent,
    DialogTaskDuedateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatCommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatCheckboxModule
  ]
})
export class WorkingAreaModule { }