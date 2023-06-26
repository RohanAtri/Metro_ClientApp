import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { keyValue } from 'src/app/shared/shared.model';
import { MasterDataService } from './../../../main/master/services/master-data-api.service';
import { coreModuleConstants } from './../../constants/core.constant';
import { ChangePasswordControls } from './../../models/core.models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('modelBody') modelBody: ElementRef<any>;
  @Input() modal: any;

  currentUser: any;
  userId: number;
  masterModuleData: ChangePasswordControls[];
  formControls: keyValue[];
  changePasswordForm: FormGroup = new FormGroup({});

  constructor(private toastService: ToastService, private render: Renderer2, private authService: AuthService, private masterServiceApi: MasterDataService, private cd: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getLoggedInUserId();
    this.getUserById(this.userId);
    this.masterModuleData = coreModuleConstants.allUserDropdown();
    this.formControls = this.filterControls(coreModuleConstants.userControlNames());
    this.createControls(coreModuleConstants.userControlNames());
    this.getRoleDropdownForUser('getAllMaster', 5, 'allUserDropdown');
  }

  getLoggedInUserId() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.userId = this.currentUser.userId;
  }

  closeModal() {
    this.modal.close('Close click');
  }

  filterControls(controlList: keyValue[]): keyValue[] {
    return controlList.filter(x => x.id !== 'id' && x.id !== 'isActive');
  }

  getRoleDropdownForUser(methodName: string, startIndex: number, name: any) {
    const service = this.masterServiceApi as any;
    service[methodName](coreModuleConstants[name as keyof typeof coreModuleConstants]()[startIndex].path).subscribe((res: any) => {
      this.masterModuleData[startIndex].data = res;
      (this.masterModuleData)
      this.cd.detectChanges();
    }, (error: any) => {
      this.masterModuleData[startIndex].data = [];
    });
  }

  createControls(controlsName: keyValue[]) {
    for (let i = 0; i < controlsName.length; i++) {
      const value = controlsName[i].id == 'isActive' ? true : controlsName[i].id == 'id' ? 0 : null;
      this.changePasswordForm?.addControl(controlsName[i].id, this.fb.control(value, controlsName[i]?.notrequired ? null : Validators.required));
      // this.changePasswordForm.get(controlsName[i].isDisable)!.disable();
      this.validateControls(controlsName[i]);
    }
  }

  validateControls(controlsName: keyValue) {
    const controlID = controlsName.id;
    if (controlID == 'confirmPassword') {
      this.changePasswordForm.controls[controlID].addValidators([Validators.required, this.validateAreEqual.bind(this)]);
    }
  }

  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.changePasswordForm.get("password")!.value ? null : {
      NotEqual: true
    };
  }


  ngSelectOpen() {
    this.render.addClass(this.modelBody.nativeElement, 'overflow-visible');
    this.render.addClass(document.getElementsByClassName('modal-content')[0], 'overflow-visible');
  }

  ngSelectClose() {
    this.render.removeClass(this.modelBody.nativeElement, 'overflow-visible')
    this.render.removeClass(document.getElementsByClassName('modal-content')[0], 'overflow-visible');
  }

  getUserById(id: number) {
    this.authService.changePassword(id).subscribe(res => {
      this.changePasswordForm.patchValue(res);
    });
  }

  updatePassword() {
    if (this.changePasswordForm.valid) {
      this.authService.updatePassword(this.changePasswordForm.value).subscribe(res => {
        this.changePasswordForm.patchValue(res);
        this.toastService.show("Data saved successfully", { classname: 'bg-success text-white', delay: 3000 });
      },(error)=>{
        this.toastService.show(error, { classname: 'bg-danger text-light', delay: 3000 });
      });
    }
  }
}
