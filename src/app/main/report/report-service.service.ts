import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ReferenceList } from '../distribution/models/distribution.model';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  baseUrl: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.baseUrl = this.appConfigService.apiBaseUrl;
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Report/getreport`);
  }

  getAllMaster(tabName: String): Observable<ReferenceList[]> {
    return this.http.get<ReferenceList[]>(`${this.baseUrl}/${tabName}`);
  }
  
  export(reportName: any, _httpParams: HttpParams) {
    window.open(`${this.baseUrl}/api/Report/download/${reportName}?${_httpParams.toString()}`, "_blank");
  }
}
