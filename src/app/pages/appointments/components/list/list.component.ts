import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Appointment } from 'src/app/models/appointment';
import { MatDialog } from '@angular/material';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';

// amount of items pulled from firestore
const batchSize = 10;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  endReached = false;

  offset = new BehaviorSubject(null);
  batch = new Observable<Appointment[]>();

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private db: AngularFirestore,
    public dialog: MatDialog
  ) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.batch = batchMap.pipe(
      map(v => Object.values(v))
    );

    this.mobileQuery = media.matchMedia('(max-width: 720px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getNextBatch(e, offset) {
    if (this.endReached) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end >= total - 5) {
      this.offset.next(offset);
    }
  }

  getBatch(lastSeenDate: Date) {
    return this.db
      .collection('appointments', ref =>
        ref
          .orderBy('date')
          .startAfter(lastSeenDate)
          .limit(batchSize)
      )
      .snapshotChanges()
      .pipe(
        tap(arr => (arr.length ? null : (this.endReached = true))),
        map(arr => {
          return arr.reduce((acc, cur) => {
            const id = cur.payload.doc.id;
            const data = cur.payload.doc.data();
            return { ...acc, [id]: data };
          }, {});
        })
      );
  }

  trackByIndex(i) {
    return i;
  }

  reload() {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(null)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.batch = batchMap.pipe(
      map(v => Object.values(v))
    );
  }

  openDialog() {
    this.dialog.open(AddAppointmentComponent, {
      data: {
      }
    }).afterClosed().subscribe(() => {
      setTimeout(() => this.reload(), 1000);

    });
  }
}
