import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  

loadAPI(): Promise<void> {
  return new Promise<void>((resolve) => {
    gapi.load('client', () => {
      resolve();
    });
  });
}

initClient() {
  return gapi.client.init({
    apiKey: environment.apiKey,
    clientId: environment.clientId,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    plugin_name: 'bizionic'
  });
}

listEvents() {
  return gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    timeMax: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime',
    });
  }
}
