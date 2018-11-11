importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '563436927369'
});

const messaging = firebase.messaging();