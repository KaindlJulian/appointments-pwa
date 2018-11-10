import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [style({ opacity: 0, transform: 'scale(0.5)' }),
      animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
    ]),
  ]
})
export class RegisterComponent {

  @Output() navigateLogin: EventEmitter<void> = new EventEmitter<void>();

  hidePassword: Boolean = true;

  checkedPrivacyTerms: Boolean = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(private router: Router, private authService: AuthService) { }

  signUp() {
    if (this.emailFormControl.valid && this.checkedPrivacyTerms && this.passwordFormControl.valid) {
      this.authService.signUp(this.emailFormControl.value, this.passwordFormControl.value)
      .then(() => {
        this.navigateLogin.emit();
      });
    }
  }
}
