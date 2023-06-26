import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  headerRow: Subject<any> = new Subject();
  lakhsToggle: Subject<any> = new Subject();

  constructor() { }

  sendlakhsToggle(data: any) {
    this.lakhsToggle.next(data);
  }

  getlakhsToggle(): Observable<any> {
    return this.lakhsToggle.asObservable();
  }

  sendHeaderRow(data: any) {
    this.headerRow.next(data);
  }

  getHeaderRow(): Observable<any> {
    return this.headerRow.asObservable();
  }

}
