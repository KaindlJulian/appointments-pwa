import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginRegisterWrapperComponent } from './components';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { ListComponent, AppointmentCommentsComponent } from './pages/appointments/components';
import { ContactListComponent } from './pages/contacts/components';
import { CalendarComponent } from './pages/calendar/components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginRegisterWrapperComponent
  },
  {
    path: 'register',
    component: LoginRegisterWrapperComponent
  },
  {
    path: 'home',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent
      },
      {
        path: 'appointments',
        component: ListComponent,
      },
      {
        path: 'appointments/:id',
        component: AppointmentCommentsComponent
      },
      {
        path: 'contacts',
        component: ContactListComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
    ]
  },
  {
    path: '',
    component: LoginRegisterWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
