import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicHttpInterceptorService } from './services/basic-http-interceptor.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  providers: [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicHttpInterceptorService, multi: true
    }
  ]
})
export class SharedModule { }
