import { Component } from '@angular/core';
import { User } from '../app/shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user! : User;
  title = 'TaskManager';

  ngOnInit(): void {
    this.user = new User(1, "gustavoteste@gmail.com", "NicknameTeste", "Nick2", "41544112233");
  }
}