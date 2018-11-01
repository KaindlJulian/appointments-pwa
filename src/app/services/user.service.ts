import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: AngularFirestoreCollection<any>;
  private userDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {
    this.users = this.db.collection<any>('appointments');
  }

  addUser(user: User) {
    // this.users.add(this.toObject(user));
  }

  updateAppointment(id, update: User) {
    this.userDoc = this.db.doc<any>(`appointments/${id}`);
    this.userDoc.update(this.toObject(update));
  }

  deleteAppointment(id) {
    this.userDoc = this.db.doc<any>(`appointments/${id}`);
    this.userDoc.delete();
  }

  toObject(model: any) {
    return JSON.parse(JSON.stringify(model));
  }
}
