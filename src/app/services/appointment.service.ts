import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointments: AngularFirestoreCollection<any>;
  private appointmentDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {
    this.appointments = this.db.collection<any>('appointments');
  }

  getAppointment(id: string) {
    return this.appointments.doc(id).get();
  }

  addAppointment(appointment: Appointment) {
    console.log(this.toObject(appointment));
    this.appointments.add(this.toObject(appointment));
  }

  addAppointments(appointments: Appointment[]) {
    appointments.forEach(a => this.addAppointment(a));
  }

  updateAppointment(id, update: Appointment) {
    this.appointmentDoc = this.db.doc<any>(`appointments/${id}`);
    return this.appointmentDoc.update(this.toObject(update));
  }

  deleteAppointment(id) {
    this.appointmentDoc = this.db.doc<any>(`appointments/${id}`);
    this.appointmentDoc.delete();
  }

  toObject(model: any) {
    return JSON.parse(JSON.stringify(model));
  }

  generateFakeData(datasets: number) {
    const data = Array(datasets)
      .fill(1)
      .map(() => {

        const attendees = Array(Math.floor((Math.random() * 4) + 2))
          .fill(1)
          .map(() => {
            return {
              name: `${faker.name.firstName()} ${faker.name.lastName()}`,
              email: faker.internet.email(),
              photoURL: faker.image.avatar()
            };
          });

        return {
          title: faker.lorem.sentence(),
          body: faker.lorem.sentences(4),
          date: new Date().toISOString(), // faker.date.future(1).toISOString()
          author: {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email(),
            photoURL: faker.image.avatar()
          },
          attendees: attendees
        };
      });
    console.log(data);
    data.forEach(d => {
      this.appointments.add(d);
    });
  }
}
