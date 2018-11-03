<p align="center">
    <img src="/src/assets/logo.svg" height="200">
</p>

# Appointments PWA [![Build Status](https://travis-ci.com/KaindlJulian/appointments-pwa.svg?token=mp2NSp7o4LF4zjnzTqDd&branch=master)](https://travis-ci.com/KaindlJulian/appointments-pwa)

> Serverless Angular PWA using some Firebase features and Google APIs

Website: https://appointments-pwa.firebaseapp.com

## Firebase

- :fire: Authentication
    - Email/Password
    - Google

- :fire: Firestore

- :fire: Functions

- :fire: Hosting

## Google APIS

The Google login via firebase includes scopes for following Google APIs

- People API (`/auth/calendar`)
- Google Calendar API (`/contacts/readonly`)

(also others like identity toolkip for basic profile informations from firebase by default)

## Virtual scrolling

To create a high performance realtime list which only renders elements that fit on the screen (similar to the Android RecyclerView that also only creates as much ViewHolders as needed). More about virtual scrolling [here](https://material.angular.io/cdk/scrolling/overview#virtual-scrolling).

## Getting started

Clone the repository

> git clone https://github.com/KaindlJulian/appointments-pwa.git

Install dependencies

> npm install

Development server

> ng serve --open