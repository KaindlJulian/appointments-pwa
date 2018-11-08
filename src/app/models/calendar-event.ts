import { User } from './user';

export class CalendarEvent {
    title: String;
    htmlLink: String;
    startDate: Date;
    endDate: Date;
    attendees: User[];
    description: String;
}
