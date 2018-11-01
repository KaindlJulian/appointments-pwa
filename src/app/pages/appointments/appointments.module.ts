import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCoreModule } from 'src/app/material-core/material-core.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ListComponent, AppointmentComponent } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MaterialCoreModule,
    ScrollingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ListComponent,
    AppointmentComponent]
})
export class AppointmentsModule { }
