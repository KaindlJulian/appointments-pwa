import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components';
import { MaterialCoreModule } from 'src/app/material-core/material-core.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialCoreModule
  ],
  declarations: [ListComponent]
})
export class AppointmentsModule { }
