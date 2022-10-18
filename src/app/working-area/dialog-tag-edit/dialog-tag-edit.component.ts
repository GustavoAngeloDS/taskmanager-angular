import { Component, Inject, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from 'src/app/shared/models/tag.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-tag-edit',
  templateUrl: './dialog-tag-edit.component.html',
  styleUrls: ['./dialog-tag-edit.component.css']
})
export class DialogTagEditComponent implements OnInit {

  dialogId!: string;
  tag!: Tag;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private workingAreaService: WorkingAreaService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  updateTag() {
    this.workingAreaService.updateTag(this.data.boardId, this.tag.id!, this.tag).subscribe({
      complete: () => {
        this.closeDialog();
        this.notificationService.showSuccess("Etiqueta atualizada");
      }
    });
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }
}
