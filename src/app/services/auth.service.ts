import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { map } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
import { sharedConstants } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  baseUrl: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.baseUrl = this.appConfigService.apiBaseUrl;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  changePassword(id: number) {
    return this.http.get<any>(`${this.baseUrl}/api/master/user/${id}`);
  }
  
  updatePassword(userDetails: any) {
    return this.http.put<any>(`${this.baseUrl}/api/master/user/${userDetails.id}`,userDetails);
  }

  getDefaults() {
    return this.http.get(`${this.baseUrl}/api/auth/defaults`);
  }


  login(username: string, password: string) {
    return this.http.post<User>(`${this.baseUrl}/api/auth`, { username, password })
      .pipe(map((user: User) => {
        if (user && user.token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    const userJson: any = sessionStorage.removeItem('currentUser');
    this.currentUser = userJson ? JSON.parse(userJson) : new User();
    this.currentUserSubject.next(new User());
  }

  hasAccess(functionName: string, type: string) {
    const user: any = sessionStorage.getItem('currentUser');
    const userObj = JSON.parse(user);
    const fun = userObj?.functions?.find((x: any) => x.name == functionName)
    return fun[type];
  }

  getFunction(functionName: string) {
    const user: any = sessionStorage.getItem('currentUser');
    const userObj = JSON.parse(user);
    const fun = userObj?.functions?.find((x: any) => x.name == functionName)
    return fun;
  }


  getFiltered(menu: any[], type: string) {
    const user: any = sessionStorage.getItem('currentUser');
    const userObj = JSON.parse(user);
    const functions = userObj.functions;
    return menu.filter(array => functions.some((f: any) => f.name === array.function && f[type]))
  }

  getMenuList() {
    const menu = sharedConstants.navBarMenu();
    const filtered = this.getFiltered(menu, 'read');
    return filtered;
  }


}
