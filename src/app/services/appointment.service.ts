import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointments: AngularFirestoreCollection<any>;
  private appointmentDoc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {
    this.appointments = this.db.collection<any>('appointments');
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
    this.appointmentDoc.update(this.toObject(update));
  }

  deleteAppointment(id) {
    this.appointmentDoc = this.db.doc<any>(`appointments/${id}`);
    this.appointmentDoc.delete();
  }

  toObject(model: any) {
    return JSON.parse(JSON.stringify(model));
  }
}
