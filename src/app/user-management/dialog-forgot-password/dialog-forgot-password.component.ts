import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {

  dialogId!: string;
  email!: string;

  constructor() { }

  ngOnInit(): void {
  }

  sendRecuperationEmail() {

  }

}
