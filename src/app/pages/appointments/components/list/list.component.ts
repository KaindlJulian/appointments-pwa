import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Appointment } from 'src/app/models/appointment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { AuthService } from 'src/app/services/auth.service';

// amount of items pulled from firestore
const batchSize = 10;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  // spinner state
  isLoading = true;

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  endReached = false;
  lastSeenDate = null;

  offset = new BehaviorSubject(null);
  batch = new Observable<any[]>();

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  test = [];

  constructor(
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private db: AngularFirestore,
    public appointmentDialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    // listening on offset changes to update the batchmap
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap((n: Date) => this.getBatch(n)),  // use mergeMap to keep older subscriptions
      scan((acc, batch) => {
        return { ...acc, ...batch };  // adding accumulated item to the others
      }, {}),
      tap(_ => {
        if (this.batch !== null) {
          this.isLoading = false;
        }
      })
    );

    this.batch = batchMap.pipe(
      map(values => {
        const arr = [];
        arr.push(...Object.values(values));
        arr.sort((a: any, b: any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        return arr;
      }),
    );

    this.mobileQuery = media.matchMedia('(max-width: 720px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // called by the (scrolledIndexChange) event
  getNextBatch(e, offset) {
    if (this.endReached) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    // if end is reached emit new offset, which triggers the batchMap in constructor
    if (end === total) {
      this.offset.next(offset as Date);
    }
  }

  getBatch(lastSeenDate: Date) {
    return this.db
      .collection('appointments', ref =>
        ref
          .orderBy('date')
          .startAfter(lastSeenDate ? lastSeenDate : new Date().toISOString())
          .limit(batchSize)
      )
      .snapshotChanges()
      .pipe(
        tap(arr => (arr.length ? null : (this.endReached = true))),
        map(arr => {
          return arr.reduce((acc, cur) => { // accumulates an array of appointments and provides it to the next callback
            const id = cur.payload.doc.id;
            const data: any = cur.payload.doc.data();
            const appointment = new Appointment();
            appointment._id = id;
            appointment.attendees = data.attendees;
            appointment.author = data.author;
            appointment.body = data.body;
            appointment.date = data.date;
            appointment.title = data.title;
            return { ...acc, [id]: appointment };
          }, {});
        })
      );
  }

  trackByIndex(i) {
    return i;
  }

  addToCalendar(event: CalendarEvent) {
    this.authService.addCalendarEvent(event);
    this.openSnackBar('Event added to your Google Calendar');
  }

  scrollTop() {
    this.viewport.scrollToIndex(0);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000
    });
  }

  openAddAppointmentDialog() {
    this.appointmentDialog.open(AddAppointmentComponent, {
      data: {
      }
    });
  }
}
