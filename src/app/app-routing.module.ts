import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginRegisterWrapperComponent } from './components';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { ListComponent } from './pages/appointments/components';
import { ContactListComponent } from './pages/contacts/components';
import { CalendarComponent } from './pages/calendar/components';
import { NotificationComponent } from './pages/sidenav/components';

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
        component: ListComponent
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
  {path: 'test', component: NotificationComponent},
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
