import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [style({ opacity: 0, transform: 'scale(0.5)' }),
      animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
    ]),
  ]
})
export class LoginComponent {

  @Output() navigateRegister: EventEmitter<void> = new EventEmitter<void>();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  hidePassword: Boolean = true;

  constructor(private router: Router, private authService: AuthService) { }

  async signIn() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      await this.authService.signIn(this.emailFormControl.value, this.passwordFormControl.value);
      this.router.navigate(['home']);
    }
  }

  async signInGoogle() {
    await this.authService.googleLogin();
    this.router.navigate(['home']);
  }
}
