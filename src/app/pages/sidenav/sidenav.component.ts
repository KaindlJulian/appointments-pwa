import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  sidenavOpened = true;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.auth.user.subscribe(u => {
      console.log(u);
    });
  }

  ngOnInit() {
    this.sidenav.openedStart.subscribe(() => {
      this.sidenavOpened = true;
    });
    this.sidenav.closedStart.subscribe(() => {
      this.sidenavOpened = false;
    });
  }

  navigateAppointments() {
    this.router.navigate(['/home', 'appointments']);
  }

}
