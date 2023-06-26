import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LimitAndQuotaService {

  headerRow: Subject<any> = new Subject();

  constructor() { }

  sendHeaderRow(data: any) {
    this.headerRow.next(data);
  }

  getHeaderRow(): Observable<any> {
    return this.headerRow.asObservable();
  }
}
