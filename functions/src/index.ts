import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

interface User {
    uid: any;
    name: String;
    email: String;
    photoURL: string;
}

interface Appointment {
    _id: String;
    author: User;
    title: String;
    body: String;
    date: Date;
    attendees: User[];
}

/**
 * cloud function that listens for create events on the appointments collection and sends a cloud messaging push notification to all attendees
 */
export const firebasCloudMsgPushNotification = functions.firestore.document('appointments/{appointmentId}').onCreate((snap, context) => {
    const appointment = snap.data() as Appointment;
    const attendeeUids: string[] = appointment.attendees.map(a => a.uid);

    /**
     * composing the notification
     */
    const notification = {
        notification: {
            title: `You were added to ${appointment.title}`,
            body: `taking place on ${appointment.date.toDateString}, created by ${appointment.author.name}`,
            icon: appointment.author.photoURL ?
                appointment.author.photoURL :
                'https://firebasestorage.googleapis.com/v0/b/appointments-pwa.appspot.com/o/notification-icon.png?alt=media&token=7f77e57e-615e-41ff-a396-50ac009344c9',
            click_action: `https://appointments-pwa.firebaseapp.com/home/appointments/${appointment._id}`
        }
    }

    /**
     * sending a notification to each attendee
     */
    attendeeUids.forEach(userId => {
        admin.firestore().doc(`fcmTokens/${userId}`).get()
            .then(token => {
                const fcmToken: any = token.data();
                const key = Object.keys(fcmToken)[0];
                return admin.messaging().sendToDevice(fcmToken[key], notification)
            })
            .then(res => {
                console.log('Sent Successfully', res);
            })
            .catch(err => {
                console.log('Error', err);
            })
    });
})
