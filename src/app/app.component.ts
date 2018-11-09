import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    Notification.requestPermission((status) => {
      if (status === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Welcome!', {
            icon: '../../assets/notification-icon.png',
            dir: 'auto',
            body: 'We will let you know when something important happens 👍',
            tag: 'welcome-message'
          });
        });
      }
    });
  }
}
