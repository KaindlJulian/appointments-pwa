import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


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
        this.router.navigate(['appointments']);
      });
    }
  }
}
