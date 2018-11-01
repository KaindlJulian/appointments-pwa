import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: firebase.User = null;

  user: Observable<firebase.User> = null;

  private userToken;

  constructor(public fireAuth: AngularFireAuth, private userService: UserService) {
    if (localStorage.getItem('user')) {
      this.user = of(JSON.parse(localStorage.getItem('user')));
    }
    fireAuth.authState.subscribe((auth) => {
      this.authState = auth;
      if (this.authenticated) {
        localStorage.setItem('userToken', JSON.stringify(this.authState.uid));
      }
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  async googleLogin() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        const res = await firebase.auth().signInWithPopup(provider);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user = of(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
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
        u.email = res.user.email;
        u.name = res.user.displayName;
        u.photoURL = res.user.photoURL;
        this.userService.addUser(u);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getProfileInfo() {
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this.fireAuth.auth.signOut();
  }
}
