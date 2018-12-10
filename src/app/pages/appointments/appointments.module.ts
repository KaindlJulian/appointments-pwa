import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialCoreModule } from 'src/app/material-core/material-core.module';

import {
  ListComponent,
  AppointmentComponent,
  AddAppointmentComponent,
  AddAttendeeComponent,
  AppointmentCommentsComponent,
} from './components';


@NgModule({
  imports: [
    CommonModule,
    MaterialCoreModule,
    ScrollingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListComponent,
    AppointmentComponent,
    AddAppointmentComponent,
    AddAttendeeComponent,
    AppointmentCommentsComponent
  ],
  entryComponents: [
    AddAppointmentComponent,
    AddAttendeeComponent
  ]
})
export class AppointmentsModule { }
