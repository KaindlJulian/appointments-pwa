import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './components';
import { MaterialCoreModule } from 'src/app/material-core/material-core.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialCoreModule
  ],
  declarations: [ContactListComponent]
})
export class ContactsModule { }
