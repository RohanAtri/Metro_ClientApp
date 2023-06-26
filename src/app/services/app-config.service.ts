import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor() {
  }

  loadAppConfig() {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.appConfig = {
          apiBaseUrl: "test"
        };
        const request = new XMLHttpRequest();
        request.open('GET', '/assets/config/app-settings.json', false);
        if (request.overrideMimeType) {
          request.overrideMimeType('application/json');
        }
        request.send();
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          this.appConfig.apiBaseUrl = data.apiBaseUrl;
        }
        resolve();
      }, 0);
    });
  }

  get apiBaseUrl(): string {
    return this.appConfig.apiBaseUrl;
  }
}