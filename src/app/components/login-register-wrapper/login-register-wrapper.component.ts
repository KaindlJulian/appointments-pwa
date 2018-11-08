import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register-wrapper',
  templateUrl: './login-register-wrapper.component.html',
  styleUrls: ['./login-register-wrapper.component.scss']
})
export class LoginRegisterWrapperComponent implements OnInit {

  displayLogin = true;

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    if (this.router.url.includes('login')) {
      this.displayLogin = true;
    } else if (  this.router.url.includes('register')) {
      this.displayLogin = false;
    }
  }
}
