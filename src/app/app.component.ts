import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    Notification.requestPermission().then((status) => {
      if (status === 'granted') {
        const welcome = new Notification('Welcome!', {
          icon: '../../assets/notification-icon.png',
          dir: 'auto',
          body: 'We will let you know when something important happens 👍',
          tag: 'welcome-message'
        });
      }
    });
  }
}
