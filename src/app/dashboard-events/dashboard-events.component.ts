import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GoogleCalendarService } from '../services/google-calendar.service';


@Component({
  selector: 'dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.scss']
})
export class DashboardEventsComponent implements OnInit {
  events: any[]= [];
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;


  constructor(private googleCalendarService: GoogleCalendarService,
              private auth: AuthService,
              private router: Router
              ) {}

  ngOnInit() {
    this.loadGoogleAPI();
  }

  async loadGoogleAPI() {
    try {
      await this.googleCalendarService.loadAPI();
      await this.googleCalendarService.initClient();
      this.loadEvents();
      console.log("eventd", this.events)
    } catch (error) {
      console.error('Error loading Google API:', error);
    }
  }

  async loadEvents() {
    const response = await this.googleCalendarService.listEvents();
    console.log('Response:', response.result.items);
    this.events = response.result.items;
  }

  singOuta(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.singOut();
  }

  navigateToScheduler() {
    this.router.navigate(['/schedule-meeting']);
  }
}
