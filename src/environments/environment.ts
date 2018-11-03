// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBbjUx3VlQc3IqbK8sttBhLXY6dT_BaeBc',
    authDomain: 'appointments-pwa.firebaseapp.com',
    databaseURL: 'https://appointments-pwa.firebaseio.com',
    projectId: 'appointments-pwa',
    storageBucket: 'appointments-pwa.appspot.com',
    messagingSenderId: '563436927369',
    clientId: '563436927369-ea0e6tmm624hsl3t00pml407ph16blfp.apps.googleusercontent.com',
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
      'https://people.googleapis.com/$discovery/rest?version=v1'
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
