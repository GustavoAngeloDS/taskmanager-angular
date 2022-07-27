import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';
import { BoardListComponent } from './board-management/board-list/board-list.component';
import { BoardPanelComponent } from './working-area/board-panel/board-panel.component';

const routes: Routes = [
  {
    path: '',
    component: BoardListComponent
  },
  {
    path: 'board-panel/:id',
    component: BoardPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }