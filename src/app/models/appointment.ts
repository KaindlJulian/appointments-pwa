import { User } from './user';

export class Appointment {
    author: User;
    title: String;
    body: String;
    date: Date;
    attendees: User[];
}
