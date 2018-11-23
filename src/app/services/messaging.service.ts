import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private cloudMessaging: AngularFireMessaging) { }

  private updateToken(token) {
    this.auth.authState.pipe(
      take(1)
    ).subscribe(user => {
      if (!user) { return; }
      const data = { [user.uid]: token };
      this.db.collection('fcmTokens').doc(user.uid).set(data);
    });
  }

  requestPermission() {
    this.cloudMessaging.requestToken.subscribe(
      (token) => {
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.cloudMessaging.messages.subscribe(
      (payload) => {
        console.log('New message received. ', payload);
        this.currentMessage.next(payload);
      });
  }
}
