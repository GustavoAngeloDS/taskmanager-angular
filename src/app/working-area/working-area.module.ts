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
import { MatCommonModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DialogTaskDeliveryDateComponent } from './dialog-task-delivery-date/dialog-task-delivery-date.component';
import { DialogTaskNotifConfigComponent } from './dialog-task-notif-config/dialog-task-notif-config.component';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DialogTagsManagementComponent } from './dialog-tags-management/dialog-tags-management.component';
import { DialogTagEditComponent } from './dialog-tag-edit/dialog-tag-edit.component';
import { DialogTagDeleteComponent } from './dialog-tag-delete/dialog-tag-delete.component';

@NgModule({
  declarations: [
    BoardPanelComponent,
    ModalStackEditComponent,
    ModalTaskComponent,
    DialogTaskComponent,
    DialogTaskMembersComponent,
    DialogTaskDeliveryDateComponent,
    DialogTaskNotifConfigComponent,
    DialogTagsManagementComponent,
    DialogTagEditComponent,
    DialogTagDeleteComponent
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
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    NgSelectModule,
    MatMomentDateModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class WorkingAreaModule { }