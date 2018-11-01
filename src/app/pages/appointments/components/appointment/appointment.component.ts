import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  cssPhotoURL: String = null;

  @Input() model: Appointment;

  constructor() { }

  ngOnInit() {


  }

  setPhoto(path: String) {
    console.log(path);
    this.cssPhotoURL = `url(${path})`;
  }
}
