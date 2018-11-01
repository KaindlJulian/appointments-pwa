import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  bodyInput;

  dateFormControl = new FormControl('', [
    Validators.required
  ]);

  minDate = new Date();


  constructor(private authService: AuthService,
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
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
      this.appointmentService.addAppointment(appointment);
    }
  }

}
