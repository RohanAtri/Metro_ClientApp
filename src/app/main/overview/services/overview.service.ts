import { Observable } from 'rxjs';
import { AppConfigService } from './../../../services/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  baseUrl: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.baseUrl = this.appConfigService.apiBaseUrl;
  }

  getOverviewList(filters: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/overview`, {
      params: filters
    });
  }

}
