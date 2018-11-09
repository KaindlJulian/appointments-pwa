import { User } from './user';

export class Appointment {
    _id: String;
    author: User;
    title: String;
    body: String;
    date: Date;
    attendees: User[];
}
