import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { MainService } from '../services/main-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: MainService, private route: Router) { }

  //icon
  public hide = true;

  //new registration Form
  registerForm = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    type: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  //on click register
  add() {
    this.service.registerUser(this.registerForm.value).subscribe(
      (res) => {
        localStorage.setItem("token1", res.token);
        alert(res.message);
        this.service.userName = res.name;
        this.service.userEmail = res.email;
        this.service.userType = res.type;
        this.route.navigate(['/profile']);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message + " Please Register again!!!");
            this.registerForm.reset();
          } else {
            alert(err.statusText + " Try Again!!!");
            this.registerForm.reset();
          }
        }
      }
    );

  }
  openLogin() {
    this.route.navigate(['/login']);
  }


  ngOnInit(): void {
  }

}
