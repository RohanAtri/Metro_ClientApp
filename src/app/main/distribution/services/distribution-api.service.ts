import { DistributionTable, ReferenceList } from './../models/distribution.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { UploadFile } from '../models/uploadFile';

@Injectable({
  providedIn: 'root'
})
export class DistributionApiService {

  baseUrl: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.baseUrl = this.appConfigService.apiBaseUrl;
  }

  getDistributionTableRecords(): Observable<DistributionTable> {
    return this.http.get<DistributionTable>(`${this.baseUrl}/api/limits/distribution`);
  }

  getAllMaster(tabName: String): Observable<ReferenceList[]> {
    return this.http.get<ReferenceList[]>(`${this.baseUrl}/${tabName}`);
  }

  getDistributionContent(tabName: String, filterOptions: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${tabName}`, filterOptions);
  }

  updateSummation(tabName: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${tabName}`, data);
  }

  downloadDistributions(params: HttpParams, tabName: string) {
    window.open(`${this.baseUrl}/${tabName}?${params.toString()}`, "_blank");
  }

  checkDataLock(mothId: number): Observable<any> {
    return this.http.get<boolean>(`${this.baseUrl}/api/limits/canedit/${mothId}`);
  }

  getDefaultDropdown() {
    return this.http.get<boolean>(`${this.baseUrl}/api/auth/defaultsids`);
  }
}
