import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [style({ opacity: 0, transform: 'scale(0.5)' }),
      animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
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

  constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) {
    localStorage.clear();
  }

  async signIn() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      await this.authService.signIn(this.emailFormControl.value, this.passwordFormControl.value)
        .catch((error) => {
          this.authService.sendResetPasswordEmail(this.emailFormControl.value).then(() => {
            this.snackBar.open(error.message, null, {
              duration: 6000
            });
          });
        });
      this.router.navigate(['home']);
    }
  }

  async signInGoogle() {
    await this.authService.googleLogin();
    this.router.navigate(['home']);
  }

  sendResetMail() {
    this.authService.sendResetPasswordEmail(this.emailFormControl.value).then(() => {
      this.snackBar.open('Reset Email sent!', null, {
        duration: 6000
      });
    });
  }
}
