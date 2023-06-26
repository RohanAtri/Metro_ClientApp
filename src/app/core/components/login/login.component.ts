import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, HostBinding, OnInit } from '@angular/core';
import { sharedConstants } from 'src/app/shared/constants/constants';
import { menuList } from 'src/app/shared/shared.model';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @HostBinding('class') class = 'd-block h-100';
  menuList: menuList[] = [];
  name:string;
  loginForm: FormGroup;
  public subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.name = "Login";
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  errorMessage: string = "";
  login() {
    this.name = "please wait, logging in..."
    if (this.loginForm.invalid) {
      this.errorMessage = "username and password is required"
      this.name = "Login"
      return;
    }
    this.subscriptions.add(
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
        .pipe(first())
        .subscribe((response) => {
          this.name = "Login";
          this.errorMessage = "Logged in successfully";
          this.router.navigate(["/distribution"]);
        }, (errorResp) => {
          this.name = "Login";
          this.errorMessage = errorResp?.error?.message ? errorResp?.error?.message : "internal server error, please contact admin";
        })
    )
  }
}
