import { User } from './user';
import { Comment } from './comment';

export class Appointment {
    _id?: String;
    author: User = new User();
    title: String;
    body: String;
    date: Date;
    attendees: User[];
    comments: Comment[];
}
