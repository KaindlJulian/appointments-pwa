import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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

export const fcmUserAddedToAppointment = functions.database.ref('appointments').onCreate(event => {
    const appointment: Appointment = event.val();
    console.log(appointment);

    const attendeeUids: string[] = appointment.attendees.map(a => a.uid);

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
    console.log(notification)

    attendeeUids.forEach(userId => {
        admin.database().ref(`fcmTokens/${userId}`).once('value')
            .then(token =>
                token.val()
            )
            .then(userFcmToken => {
                return admin.messaging().sendToDevice(userFcmToken, notification)
            })
            .then(res => {
                console.log("Sent Successfully", res);
            })
            .catch(err => {
                console.log(err);
            })
    });
})
