import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCoreModule } from 'src/app/material-core/material-core.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListComponent, AppointmentComponent, AddAppointmentComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    AddAppointmentComponent],
  entryComponents: [
    AddAppointmentComponent
  ]
})
export class AppointmentsModule { }
