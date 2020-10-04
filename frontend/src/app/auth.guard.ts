import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MainService } from './services/main-service.service';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: MainService, private router: Router) { }
  canActivate(): boolean {
    if (this.service.loggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
