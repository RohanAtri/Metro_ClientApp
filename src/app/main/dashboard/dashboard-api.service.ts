import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ReferenceList } from './models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  baseUrl: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.baseUrl = this.appConfigService.apiBaseUrl;
  }

  getListFilter(filterOptions: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/dashboard`, filterOptions);
  }

  getAllMaster(tabName: String): Observable<ReferenceList[]> {
    return this.http.get<ReferenceList[]>(`${this.baseUrl}/${tabName}`);
  }

}
