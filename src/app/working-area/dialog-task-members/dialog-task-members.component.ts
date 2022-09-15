import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { Board } from 'src/app/shared/models/board.model';
import { User } from 'src/app/shared/models/user.model';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-dialog-task-members',
  templateUrl: './dialog-task-members.component.html',
  styleUrls: ['./dialog-task-members.component.css']
})
export class DialogTaskMembersComponent implements OnInit {
  board!: Board;
  task!: Task;

  inputControl = new FormControl('');
  boardMemberList: Observable<Array<User>>;

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor() {
    let user1 = new User('102030', 'gustavo@gmail.com', 'gst1', 'nick', '41955446655', undefined);
    let user2 = new User('202030', 'aloalo@gmail.com', 'gst1', 'nick', '41955446655', undefined);

    this.board = new Board('1', 'teste', 'teste desc', undefined, [user1, user2], user1);
    this.task = new Task('12', 'Titulo teste', 'Desc teste', [user1], []);

    this.boardMemberList = this.inputControl.valueChanges.pipe(
      startWith(null), map((boardMemberEmail: any) => (this._filter(boardMemberEmail)))
    );
  }

  ngOnInit(): void {

  }

  remove(member: User): void {
    const indexToBeRemoved = this.task.memberList!.indexOf(member);

    if (indexToBeRemoved >= 0) {
      this.task.memberList!.splice(indexToBeRemoved, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.task.memberList!.push(event.option.value);
    this.emailInput.nativeElement.value = '';
    this.inputControl.setValue(null);
  }

  private _filter(value: any): User[] {
    if (value instanceof User || !value)
      return this.board.memberList!.filter((boardMember) => !this.task.memberList?.includes(boardMember));

    return this.board.memberList!.filter(member => member.email!.toLowerCase().includes(value.toLowerCase()) && !this.task.memberList!.includes(member));
  }
}