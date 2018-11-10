import { User } from './user';

export class CalendarEvent {
    id: String;
    title: String;
    htmlLink: String;
    startDate: Date;
    endDate: Date;
    attendees: User[];
    description: String;
}
