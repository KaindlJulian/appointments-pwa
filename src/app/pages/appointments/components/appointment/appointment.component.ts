import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { MatDialog } from '@angular/material';
import { AddAttendeeComponent } from '../add-attendee/add-attendee.component';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {

  cssPhotoURL: String = null;

  @Input() model: Appointment;

  @Output() addCalendarEvent: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  constructor(public attendeeDialog: MatDialog, private appointmentService: AppointmentService) { }

  setPhoto(path: String) {
    console.log(path);
    this.cssPhotoURL = `url(${path})`;
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

  openAddAttendeeDialog() {
    const dialogRef = this.attendeeDialog.open(AddAttendeeComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        (result as User[]).forEach(u => {
          this.model.attendees.push(u);
        });
        this.appointmentService.updateAppointment(this.model._id, this.model);
      }
    });
  }

  googleContactToUser(googleContacts: Contact[]): User[] {
    const converted: User[] = [];
    return converted;
  }
}
