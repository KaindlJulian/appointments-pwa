import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.scss']
})
export class AddAttendeeComponent implements OnInit {

  googleContacts: Contact[];
  users: User[];

  constructor(public dialogRef: MatDialogRef<AddAttendeeComponent>,
    private authService: AuthService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.authService.getContacts().then(data => {
      this.googleContacts = data;
    });
    this.authService.user.subscribe(user => {
      this.authService.getUsers(user).then(data => {
        this.users = data;
      });
    });
  }

}
