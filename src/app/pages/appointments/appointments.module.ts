import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCoreModule } from 'src/app/material-core/material-core.module';

import { ListComponent, AppointmentComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    MaterialCoreModule
  ],
  declarations: [
    ListComponent,
    AppointmentComponent]
})
export class AppointmentsModule { }
