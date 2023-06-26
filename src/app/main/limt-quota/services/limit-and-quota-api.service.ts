import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ReferenceList } from '../../distribution/models/distribution.model';

@Injectable({
  providedIn: 'root'
})
export class LimitAndQuotaApiService {

  baseUrl: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { 
    this.baseUrl = this.appConfigService.apiBaseUrl;
  }

  getList(tabName: String): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${tabName}`);
  }
  getListFilter(tabName: String, filterOptions: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${tabName}`, filterOptions);
  }
  updateSummation(tabName: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${tabName}`, data);
  }

  dowloadLimitsAndQouta(params: HttpParams, tabName: string) {
    window.open(`${this.baseUrl}/${tabName}?${params.toString()}`, "_blank");
  }
  
  checkDataLock(mothId: number): Observable<any> {
    return this.http.get<boolean>(`${this.baseUrl}/api/limits/canedit/${mothId}`);
  }

  getDefaultDropdown() {
    return this.http.get<boolean>(`${this.baseUrl}/api/auth/defaultsids`);
  }

  
  getAllMaster(tabName: String): Observable<ReferenceList[]> {
    return this.http.get<ReferenceList[]>(`${this.baseUrl}/${tabName}`);
  }
}
