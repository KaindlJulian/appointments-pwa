import { Component, OnInit, ViewChild, ElementRef, Inject, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MatDialogRef, MatAutocompleteSelectedEvent, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.scss']
})
export class AddAttendeeComponent implements OnInit {

  userCtrl = new FormControl();

  googleContacts: User[];
  users: User[];

  selectedAttendees: User[] = new Array<User>();

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public model: Appointment,
    public dialogRef: MatDialogRef<AddAttendeeComponent>,
    private authService: AuthService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.authService.getContacts().then(data => {
      this.googleContacts = (this.googleContactToUser(data) as User[]);
    });
    this.authService.user.subscribe(user => {
      this.authService.getUsers(user).then(data => {
        this.users = data;
      });
    });
  }

  googleContactToUser(googleContacts: Contact[] | Contact): User[] | User {
    if (!Array.isArray(googleContacts)) {
      const u = new User();
      u.name = googleContacts.displayName;
      u.email = googleContacts.email;
      u.photoURL = googleContacts.photoURL;
      u.uid = null;
      return u;
    }
    const converted: User[] = [];
    googleContacts.forEach(g => {
      const u = new User();
      u.name = g.displayName;
      u.email = g.email;
      u.photoURL = g.photoURL;
      u.uid = null;
      converted.push(u);
    });
    return converted;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const u: User = event.option.value;
    if (!this.selectedAttendees.includes(u)) {
      this.selectedAttendees.push(u);
    }
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  remove(user: User): void {
    const index = this.selectedAttendees.indexOf(user);
    if (index >= 0) {
      this.selectedAttendees.splice(index, 1);
    }
  }
}
