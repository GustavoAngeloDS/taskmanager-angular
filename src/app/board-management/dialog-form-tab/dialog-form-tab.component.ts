import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-form-tab',
  templateUrl: './dialog-form-tab.component.html',
  styleUrls: ['./dialog-form-tab.component.css']
})
export class DialogFormTabComponent implements OnInit {

  dialogId!: string;

  constructor() { }

  ngOnInit(): void {
  }
}