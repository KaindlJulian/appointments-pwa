import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User> = null;

  constructor(public fireAuth: AngularFireAuth, private userService: UserService) {
    this.initClient();
    if (localStorage.getItem('user')) {
      this.user = of(JSON.parse(localStorage.getItem('user')));
    }
    this.user = fireAuth.authState;
  }

  initClient() {
    console.log(gapi);
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: 'AIzaSyBbjUx3VlQc3IqbK8sttBhLXY6dT_BaeBc',
        clientId: '563436927369-ea0e6tmm624hsl3t00pml407ph16blfp.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          'https://people.googleapis.com/$discovery/rest?version=v1'
        ],
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts.readonly'
      });
      gapi.client.load('calendar', 'v3', () => console.log('calendar ready'));
      //  gapi.client.load('people', 'v1', () => console.log('contacts ready'));
    });
  }

  async googleLogin() {

    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    const credential = firebase.auth.GoogleAuthProvider.credential(token);

    const res = await this.fireAuth.auth.signInAndRetrieveDataWithCredential(credential);

    localStorage.setItem('user', JSON.stringify(res.user)); // maybe save session w/ service worker

    const u = new User();
    u.uid = res.user.uid;
    u.email = res.user.email;
    u.name = res.user.displayName;
    u.photoURL = res.user.photoURL;
    this.userService.addUserWithId(u, res.user.uid);

    this.user = of(res.user);
  }

  async signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user)); // maybe save session w/ service worker
        this.user = of(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async signUp(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        const u = new User();
        u.uid = res.user.uid;
        u.email = res.user.email;
        u.name = res.user.email.substr(0, res.user.email.indexOf('@'));
        u.photoURL = res.user.photoURL;
        this.userService.addUserWithId(u, res.user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 20,
      orderBy: 'startTime'
    });

    return events.result.items;
  }

  async getContacts() {

    const people = await gapi.client.people.people.connections.list({
      'resourceName': 'people/me',
      'personFields': 'names,emailAddresses',
      'sortOrder': 'FIRST_NAME_ASCENDING'
    });

    console.log(people);

    return people.result.connections;
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this.fireAuth.auth.signOut();
  }
}
