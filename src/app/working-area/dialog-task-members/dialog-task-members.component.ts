import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { Board } from 'src/app/shared/models/board.model';
import { User } from 'src/app/shared/models/user.model';
import { Task } from 'src/app/shared/models/task.model';
import { WorkingAreaService } from '../services/working-area.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-task-members',
  templateUrl: './dialog-task-members.component.html',
  styleUrls: ['./dialog-task-members.component.css']
})
export class DialogTaskMembersComponent implements OnInit {
  board!: Board;
  task!: Task;
  dialogId!: string;

  inputControl = new FormControl('');
  boardMemberList: Observable<Array<User>>;

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private notficationService: NotificationService, private workingAreaService: WorkingAreaService) {
    this.boardMemberList = this.inputControl.valueChanges.pipe(
      startWith(null), map((boardMemberEmail: any) => (this._filter(boardMemberEmail)))
    );
  }

  ngOnInit(): void {
    this.findBoard();
    this.findTask();
  }

  private findBoard() {
    this.workingAreaService.findBoardById(this.data.boardId).subscribe({
      next: (board) => this.board = board
    })
  }

  private findTask() {
    this.workingAreaService.findTaskById(this.data.boardId, this.data.taskId).subscribe({
      next: (task) => this.task = task
    })
  }

  remove(member: User): void {
    const indexToBeRemoved = this.task.memberList!.indexOf(member);

    if (indexToBeRemoved >= 0) {
      this.task.memberList!.splice(indexToBeRemoved, 1);
    }
    this.inputControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.task.memberList!.push(event.option.value);
    this.emailInput.nativeElement.value = '';
  }

  private _filter(value: any): Array<User> {
    let toReturn: Array<User> = [];

    if (typeof value === 'object' && value != null) {
      this.board.memberList!.filter((boardMember) => boardMember.id! != (value as User).id!).forEach((boardMember) => {
        if (this.task.memberList!.filter((taskMember) => taskMember.id! == boardMember.id!).length <= 0)
          toReturn.push(boardMember);
      });
    }
    else if (typeof value === 'string') {
      this.board.memberList!.filter(member => member.email!.toLowerCase().includes(value.toLowerCase()))
        .forEach((boardMember) => {
          if (this.task.memberList!.filter((taskMember) => taskMember.id! == boardMember.id!).length <= 0)
            toReturn.push(boardMember);
        });
    } else {
      this.board.memberList!.forEach((boardMember) => {
        if (this.task.memberList!.filter((taskMember) => taskMember.id! == boardMember.id!).length <= 0)
          toReturn.push(boardMember);
      });
    }

    return toReturn;
  }

  saveTaskMemberList() {
    let taskMemberIdList: Array<string> = [];
    this.task.memberList?.forEach((member) => taskMemberIdList.push(member.id!))!;

    this.workingAreaService.updateTaskMemberList(this.board.id!, this.task.id!, taskMemberIdList).subscribe({
      error: (error) => this.notficationService.showError("Falha ao atualizar membros da tarefa: " + error.message),
      complete: () => {
        this.notficationService.showSuccess("Membros da tarefa atualizados com sucesso");
        this.matDialog.getDialogById(this.dialogId)?.close();
      }
    });
  }

  closeDialog() {
    this.matDialog.getDialogById(this.dialogId)?.close();
  }
}