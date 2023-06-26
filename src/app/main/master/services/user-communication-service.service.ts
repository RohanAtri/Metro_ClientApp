import { Subject, Observable } from 'rxjs';
import { MasterModuleData } from './../../../shared/shared.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCommunicationServiceService {

  userDropdownList: Subject<MasterModuleData[]> = new Subject<MasterModuleData[]>();

  constructor() { }

  sendDropdownList(list: MasterModuleData[]) {
    this.userDropdownList.next(list);
  }

  getDropdownList(): Observable<MasterModuleData[]> {
    return this.userDropdownList.asObservable();
  }
}
