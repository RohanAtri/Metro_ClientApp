import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterData, UserAccess } from '../models/master.model';
import { AppConfigService } from 'src/app/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  baseUrl: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { 
    this.baseUrl = this.appConfigService.apiBaseUrl;
  }

  getAllMaster(tabName: String): Observable<MasterData[]> {
    return this.http.get<MasterData[]>(`${this.baseUrl}/${tabName}`);
  }

  getById(tabName: string, value: MasterData | any): Observable<MasterData> {
    return this.http.get<MasterData>(`${this.baseUrl}/${tabName}/${value.id}`);
  }

  saveMasterData(tabName: string, value: MasterData | any): Observable<MasterData> {
    return this.http.post<MasterData>(`${this.baseUrl}/${tabName}`, value);
  }

  updateMasterData(tabName: string, value: MasterData): Observable<MasterData> {
    return this.http.put<MasterData>(`${this.baseUrl}/${tabName}/${value.id}`, value);
  }

  deleteMasterData(tabName: string, value: MasterData): Observable<MasterData> {
    return this.http.delete<MasterData>(`${this.baseUrl}/${tabName}/${value.id}`);
  }

  getCityById(tabName: string, id: number) {
    return this.http.get<MasterData[]>(`${this.baseUrl}/${tabName}/${id}`);
  }

  getDataById(tabName: string, id: number) {
    return this.http.get<MasterData[]>(`${this.baseUrl}/${tabName}/${id}`);
  }

  getRoleFunctionByRoleId(id: number) {
    return this.http.get<any>(`${this.baseUrl}/api/roles/${id}`);
  }

  getUserAccessData(userId: number): Observable<UserAccess> {
    return this.http.get<any>(`${this.baseUrl}/api/roles/useraccess/${userId}`);
  }
}
