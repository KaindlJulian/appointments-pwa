import { User } from './user';

export class Comment {
    _id?: String;
    author: User;
    body: String;
    date: Date;
}
