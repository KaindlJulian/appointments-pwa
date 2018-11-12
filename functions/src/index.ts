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
            title: `You were added to: "${appointment.title}"`,
            body: `taking place on ${appointment.date}, created by ${appointment.author.name}`,
            icon: appointment.author.photoURL ?
                appointment.author.photoURL :
                'https://firebasestorage.googleapis.com/v0/b/appointments-pwa.appspot.com/o/notification-icon.png?alt=media&token=4aa7f55c-9ce5-4e56-b712-ed45eb70e0a9',
            click_action: 'https://appointments-pwa.firebaseapp.com'
        }
    }


    attendeeUids.forEach(userId => {
        admin.firestore().doc(`fcmTokens/${userId}`).get()
            .then(token => {
                const fcmToken: any = token.data();
                console.log(fcmToken);

                const key = Object.keys(fcmToken)[0];
                console.log(fcmToken[key])
                return admin.messaging().sendToDevice(fcmToken[key], notification)
            })
            .then(res => {
                console.log('Sent Successfully', res);
            })
            .catch(err => {
                console.log(err);
            })
    });
})