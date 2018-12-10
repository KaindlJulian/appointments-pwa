import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-comments',
  templateUrl: './appointment-comments.component.html',
  styleUrls: ['./appointment-comments.component.scss'],
})
export class AppointmentCommentsComponent implements OnInit {

  appointmentId;

  appointment;

  constructor(private route: ActivatedRoute, private appointmentservice: AppointmentService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.appointmentId = params['id'];
    });
    this.appointment = this.appointmentservice.getAppointment(this.appointmentId).pipe(
      map(snap => snap.data())
    );
  }

}
