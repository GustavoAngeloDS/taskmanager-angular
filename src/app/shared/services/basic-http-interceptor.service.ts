import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BasicHttpInterceptorService implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.endsWith("/validateLogin") && !(req.method === "POST" && req.url.endsWith("/users")) && !req.url.includes("/accept-invite/")) {
      if (sessionStorage.getItem("username") && sessionStorage.getItem("basicauth")) {
        req = req.clone({
          headers: req.headers.append("Authorization", sessionStorage.getItem("basicauth")!)
        });
      } else {
        this.notificationService.showError("It was not possible to find user credentials");
      }
    }

    return next.handle(req);
  }
}
