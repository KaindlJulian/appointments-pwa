import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent, NotificationComponent } from './components';
import { MaterialCoreModule } from 'src/app/material-core/material-core.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialCoreModule,
  ],
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    NotificationComponent
  ],
  entryComponents: [
    NotificationComponent
  ]
})
export class SidenavModule { }
