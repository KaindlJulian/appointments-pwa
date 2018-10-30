import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: firebase.User = null;

  constructor(public fireAuth: AngularFireAuth) {
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
      .then(() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

  async signUp(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.fireAuth.auth.signOut();
  }
}
