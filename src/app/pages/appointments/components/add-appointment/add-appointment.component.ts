import { Component, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatAutocompleteSelectedEvent, MatAutocomplete, MatChipInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Observable, of } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  bodyInput;

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  minDate = new Date();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  users: User[];
  selectedUsers: User[] = [];
  filteredUsers: Observable<User[]>;
  userCtrl = new FormControl();

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(private authService: AuthService,
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.authService.user.subscribe(user => {
      this.authService.getUsers(user).then(users => {
        this.users = users;
        this.filteredUsers = this.userCtrl.valueChanges.pipe(
          startWith(null),
          map((userName: string | null) => typeof userName === 'string' ?
          this._filter(userName) :
          this.users.filter((u) => !this.selectedUsers.includes(u))));
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.titleFormControl.valid && this.dateFormControl.valid) {
      const appointment = new Appointment();
      appointment.title = this.titleFormControl.value;
      appointment.body = this.bodyInput;
      appointment.date = this.dateFormControl.value;

      const author = new User();
      await this.authService.user.toPromise().then(u => {
        author.email = u.email;
        author.name = u.displayName;
        author.photoURL = u.photoURL;
      });

      appointment.author = author;
      appointment.attendees = this.selectedUsers;
      this.appointmentService.addAppointment(appointment);
    }
    this.dialogRef.close();
  }

  remove(user: User): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(event.option.value);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(userName: string): User[] {
    console.log(userName);
    const filterValue = userName.toLowerCase();
    return this.users.filter(u => u.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
