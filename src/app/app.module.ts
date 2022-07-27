import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardManagementModule } from './board-management/board-management.module';
import { UserOnboardingModule } from './user-onboarding/user-onboarding.module';
import { WorkingAreaModule } from './working-area/working-area.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    BoardManagementModule,
    WorkingAreaModule,
    UserOnboardingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
