import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';

 const routes: Routes = [
{path:'', component:LoginComponent},
{path:'dashboard-events', component:DashboardEventsComponent},
{path:'schedule-meeting', component:ScheduleMeetingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

