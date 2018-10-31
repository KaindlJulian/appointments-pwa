import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  a = new Appointment();

  constructor() { }

  ngOnInit() {
    const b = new User();
    b.name = 'test';
    b.email = 'test@tset.com';
    this.a.title = 'Test';
    this.a.body = 'ASDAD asDASD asdAsd asDasd asdasdas asd asdasdasasd asdasda asdas asdsda sa';
    this.a.date = new Date();
    this.a.author = b;
  }

}
