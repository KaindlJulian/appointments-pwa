import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.contacts = await this.authService.getContacts();
  }
}
