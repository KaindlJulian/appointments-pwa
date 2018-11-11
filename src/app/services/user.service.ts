import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: AngularFirestoreCollection;
  private userDoc: AngularFirestoreDocument;

  constructor(private db: AngularFirestore) {
    this.users = this.db.collection('users');
  }

  addUser(user: User) {
    this.users.add(this.toObject(user));
  }

  addUserWithId(user: User, uid: any) {
    this.users.doc(uid).set(this.toObject(user));
  }

  getAll(uid: string): User[] {
    const users: User[] = [];

    this.users.ref.orderBy('name').get().then((snap) => {
      snap.forEach(doc => {
        if (doc.data().uid !== uid ? uid : '') {
          const u = new User();
          u.email = doc.data().email;
          u.name = doc.data().name;
          u.photoURL = doc.data().photoURL;
          u.uid = doc.data().uid;
          users.push(u);
        }
      });
    });
    return users;
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
