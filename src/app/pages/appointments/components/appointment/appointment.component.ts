import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { MatDialog } from '@angular/material';
import { AddAttendeeComponent } from '../add-attendee/add-attendee.component';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {

  selfDeleted = false;

  user$: Observable<firebase.User>;

  @Input() model: Appointment;

  @Output() addCalendarEvent: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  @Output() deleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public attendeeDialog: MatDialog,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.user;
  }

  addClicked(event: Appointment) {
    const calendarEvt: CalendarEvent = new CalendarEvent();
    calendarEvt.title = event.title;
    calendarEvt.description = event.body;
    calendarEvt.startDate = event.date;
    calendarEvt.endDate = event.date;
    calendarEvt.attendees = event.attendees;
    this.addCalendarEvent.emit(calendarEvt);
  }

  delete(appointment: Appointment) {
    this.selfDeleted = true;
    this.appointmentService.deleteAppointment(appointment._id);
    this.deleted.emit();
  }

  openAddAttendeeDialog() {
    const dialogRef = this.attendeeDialog.open(AddAttendeeComponent, {
      data: this.model
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        (result as User[]).forEach(u => {
          this.model.attendees.push(u);
        });
        this.appointmentService.updateAppointment(this.model._id, this.model);
      }
    });
  }

  navigateAppointment() {
    this.router.navigate(['home', 'appointments', this.model._id]);
  }
}
