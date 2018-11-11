import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  message;

  constructor() { }

  ngOnInit() {

  }
}
