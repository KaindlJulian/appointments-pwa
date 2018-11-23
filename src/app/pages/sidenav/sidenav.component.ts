import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { NotificationComponent } from './components';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }),
      animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
    ]),
  ]
})
export class SidenavComponent implements OnInit {

  sidenavOpened;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private msgService: MessagingService,
    public snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    if (!this.mobileQuery.matches) {
      this.sidenavOpened = true;
    }
  }

  ngOnInit() {
    this.sidenav.openedStart.subscribe(() => {
      this.sidenavOpened = true;
    });
    this.sidenav.closedStart.subscribe(() => {
      this.sidenavOpened = false;
    });

    this.msgService.requestPermission();
    this.msgService.receiveMessage();
    this.msgService.currentMessage.subscribe(message => {
      if (message) {
        this.snackBar.openFromComponent(NotificationComponent, {
          data: message.notification,
          duration: 7000,
          panelClass: ['dark-snackbar'],
        });
      }
    });
  }

  navigateAppointments() {
    this.router.navigate(['/home', 'appointments']);
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }

  navigateContacts() {
    this.router.navigate(['/home', 'contacts']);
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }

  navigateCalendar() {
    this.router.navigate(['/home', 'calendar']);
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }
}
