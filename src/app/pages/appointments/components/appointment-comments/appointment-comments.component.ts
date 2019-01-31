import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment-comments',
  templateUrl: './appointment-comments.component.html',
  styleUrls: ['./appointment-comments.component.scss'],
})
export class AppointmentCommentsComponent implements OnInit {

  appointmentId;

  appointment;

  data: Appointment;

  user: firebase.User;

  inputEmpty = true;

  commentFormControl = new FormControl();

  constructor(private route: ActivatedRoute, private appointmentservice: AppointmentService, private authService: AuthService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.appointmentId = params['id'];
    });

    this.appointment = this.appointmentservice.getAppointment(this.appointmentId).pipe(
      map(snap => {
        this.data = snap.data() as Appointment;
        return snap.data();
      })
    );

    this.authService.user.subscribe(u => {
      this.user = u;
    });

    this.commentFormControl.valueChanges.subscribe((v: string) => {
      if (/\S/.test(v)) {
        this.inputEmpty = false;
      } else {
        this.inputEmpty = true;
      }
      this.autosize();
    });
  }

  autosize() {
    const el = document.getElementById('textarea');
    const buttons = document.getElementById('buttons');
    setTimeout(function () {
      buttons.style.cssText += 'display: flex;';
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
  }

  cancel() {
    this.commentFormControl.setValue('');
  }

  comment() {
    const user = new User();
    user.name = this.user.displayName;
    if (!this.user.displayName) {
      user.name = this.user.email.substring(0, this.user.email.indexOf('@'));
    }
    user.email = this.user.email;
    user.photoURL = this.user.photoURL;

    const comment = new Comment();
    comment.author = user;
    comment.body = this.commentFormControl.value;
    comment.date = new Date();

    const appointment = this.data;
    if (!appointment.comments) {
      appointment.comments = [];
    }
    appointment.comments.unshift(comment);
    this.appointmentservice.updateAppointment(this.appointmentId, appointment).then(_ => {
      this.appointment = this.appointmentservice.getAppointment(this.appointmentId).pipe(
        map(snap => {
          this.data = snap.data() as Appointment;
          return snap.data();
        })
      );
    }).then(_ => this.cancel());
  }
}
