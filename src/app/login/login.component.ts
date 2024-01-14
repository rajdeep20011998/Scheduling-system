declare var google: any;
declare var gapi: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,){}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.clientId,
      callback: (response: any) => {
        this.handleLogin(response);
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });

    gapi.load('client:auth2', () => {
      this.initializeGapiClient();
    });
  }

  private initializeGapiClient() {
    gapi.client.init({
      apiKey: environment.apiKey,
      clientId: environment.clientId,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly', 
    }).then(() => {
    }).catch((error: any) => {
      console.error('Error initializing Google API client:', error);
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  private handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      this.router.navigate(['dashboard-events']);
    }
  }
}

