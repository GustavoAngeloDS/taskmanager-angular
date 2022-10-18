import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/shared/models/board.model';
import { Tag } from 'src/app/shared/models/tag.model';
import { DialogTagDeleteComponent } from '../dialog-tag-delete/dialog-tag-delete.component';
import { DialogTagEditComponent } from '../dialog-tag-edit/dialog-tag-edit.component';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-dialog-tags-management',
  templateUrl: './dialog-tags-management.component.html',
  styleUrls: ['./dialog-tags-management.component.css']
})
export class DialogTagsManagementComponent implements OnInit {

  dialogId!: string;
  availableTags!: Array<Tag>

  newTag: Tag = new Tag();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private workingAreaService: WorkingAreaService) { }

  ngOnInit(): void {
    this.findBoardTags();
  }

  private findBoardTags() {
    this.workingAreaService.findAllTagsByBoardId(this.data.boardId).subscribe({
      next: (tagList: Array<Tag>) => this.availableTags = tagList
    });
  }

  closeDialog(): void {
    this.matDialog.getDialogById(this.dialogId)!.close();
  }

  openDialogTagDelete(tag: Tag) {
    const dialog = this.matDialog.open(DialogTagDeleteComponent, {
      data: {
        boardId: this.data.boardId
      }
    });
    dialog.componentInstance.dialogId = dialog.id;
    dialog.componentInstance.tag = tag;
    dialog.afterClosed().subscribe({
      complete: () => this.findBoardTags()
    });
  }

  openDialogTagEdit(tag: Tag) {
    const dialog = this.matDialog.open(DialogTagEditComponent, {
      data: {
        boardId: this.data.boardId
      }
    });
    dialog.componentInstance.dialogId = dialog.id;
    dialog.componentInstance.tag = tag;
    dialog.afterClosed().subscribe({
      complete: () => this.findBoardTags()
    });
  }

  saveNewTag() {
    this.workingAreaService.saveNewTag(this.data.boardId, this.newTag).subscribe({
      complete: () => {
        this.findBoardTags();
        this.clearNewTag();
      }
    });
  }

  clearNewTag() {
    this.newTag = new Tag();
  }
}

