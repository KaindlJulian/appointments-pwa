import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sidenavOpened = true;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.sidenav.openedStart.subscribe(() => {
      this.sidenavOpened = true;
    });
    this.sidenav.closedStart.subscribe(() => {
      this.sidenavOpened = false;
    });
  }

}
