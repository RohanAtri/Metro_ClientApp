import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { sharedConstants } from './../../../shared/constants/constants';
import { menuList } from './../../../shared/shared.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuList: menuList[] = [];
  userName: string;

  constructor(private _authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMenuList();

    this.userName = this._authService.currentUserValue.userName;
  }

  getMenuList() {
    this.menuList = this._authService.getMenuList()

  }

  logout() {
    this._authService.logout();
    this.router.navigate(["/login"]);
  }

  openAddNewModal(content: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static', scrollable: true });
  }

}