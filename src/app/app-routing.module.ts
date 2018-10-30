import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent, RegisterComponent } from './components';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { ListComponent } from './pages/appointments/components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'appointments',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
