import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  cssPhotoURL: String = null;

  @Input() photoURL: String = '/assets/account.png';

  @Input() model: Appointment;

  constructor() {}

  ngOnInit() {
    if (this.model) {
      this.setPhoto(this.model.author.photoURL ? this.model.author.photoURL : '/assets/account.png');
    }
  }

  setPhoto(path: String) {
    this.cssPhotoURL = `url(${path})`;
  }
}
