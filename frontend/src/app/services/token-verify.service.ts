import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { MainService } from '../services/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenVerifyService implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(req, next) {
    let authService = this.injector.get(MainService);

    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(tokenizedRequest);
  }
}
