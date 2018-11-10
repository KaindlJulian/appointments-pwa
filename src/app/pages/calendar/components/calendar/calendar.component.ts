import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarEvent } from 'src/app/models/calendar-event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: CalendarEvent[] = [];

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.authService.getCalendar().then(data => {
      this.events = data;
    });
  }

  deleteEvent(id: String) {
    this.authService.removeCalendarEvent(id.toString());
    this.events = this.events.filter(e => e.id !== id);
  }
}
