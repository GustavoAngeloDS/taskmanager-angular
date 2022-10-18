import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Tag } from 'src/app/shared/models/tag.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-tag-delete',
  templateUrl: './dialog-tag-delete.component.html',
  styleUrls: ['./dialog-tag-delete.component.css']
})
export class DialogTagDeleteComponent implements OnInit {

  dialogId!: string;
  tag!: Tag;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private workingAreaService: WorkingAreaService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  removeTag() {
    this.workingAreaService.removeTag(this.data.boardId!, this.tag.id!).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Tag removida");
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }

}
