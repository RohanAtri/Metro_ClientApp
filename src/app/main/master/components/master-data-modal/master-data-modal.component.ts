import { GETDROPDOWNLIST } from './../../constants/master.route';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { keyValue, MasterModuleData } from './../../../../shared/shared.model';
import { masterDataConstant } from './../../constants/master.constants';
import { MasterData } from './../../models/master.model';
import { MasterDataService } from './../../services/master-data-api.service';

@Component({
  selector: 'app-master-data-modal',
  templateUrl: './master-data-modal.component.html',
  styleUrls: ['./master-data-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterDataModalComponent implements OnInit, OnDestroy {

  @ViewChild('modelBody') modelBody: ElementRef<any>;
  @Input() modal: any;
  @Input() activeTabNumber: number;
  @Input() title: string;
  /**
   * Data to edit
   */
  @Input()
  set dataToEdit(value: MasterData) {
    this.masterDataToEdit = value;
  }
  get dataToEdit(): MasterData {
    return this.masterDataToEdit;
  }

  @Output() masterDataValue: EventEmitter<MasterData> = new EventEmitter<MasterData>();
  @Output() resetData: EventEmitter<MasterData> = new EventEmitter<MasterData>();

  masterDataForm: FormGroup = new FormGroup({});
  masterDataToEdit: MasterData;
  masterModuleData: MasterModuleData[];
  showroomDropdownList: MasterModuleData[]
  masterDataFormControls: keyValue[];
  isOpen: boolean;

  constructor(private render: Renderer2, private fb: FormBuilder, private masterServiceApi: MasterDataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.activeTabNumber === 8) {
      this.masterModuleData = masterDataConstant.allProductDropdownList();
      // this.getAllDropdownOptions('getAllMaster');
      this.getDropdownList('getAllMaster', masterDataConstant.allProductDropdownList(), this.masterDataToEdit);
      this.masterDataFormControls = this.filterControls(masterDataConstant.productControlNames());
      this.createControls(masterDataConstant.productControlNames());
    }
    else if (this.activeTabNumber === 11) {
      this.masterModuleData = masterDataConstant.allShowroomDropDownData();
      this.getShowroomDropdownList('getAllMaster');
      this.masterDataFormControls = this.filterControls(masterDataConstant.showroomControlNames());
      this.createControls(masterDataConstant.showroomControlNames());
    }
    else if (this.activeTabNumber === 10) {
      this.masterModuleData = masterDataConstant.allManagerTypeList();
      this.masterDataFormControls = this.filterControls(masterDataConstant.managerSection());
      this.createControls(masterDataConstant.managerSection());
      this.getRoleDropdownForUser('getAllMaster', 0, 'allManagerTypeList');
    }
    else if (this.activeTabNumber === 14) {
      this.masterModuleData = masterDataConstant.allUserDropdown();
      this.masterDataFormControls = this.filterControls(masterDataConstant.userControlNames());
      this.createControls(masterDataConstant.userControlNames());
      this.getRoleDropdownForUser('getAllMaster', 5, 'allUserDropdown');
    }
    else if (this.activeTabNumber === 5) {
      this.masterModuleData = masterDataConstant.allSubCategoryDropdownList();
      this.getDropdownList('getAllMaster', masterDataConstant.allSubCategoryDropdownList(), this.masterDataToEdit);
      this.masterDataFormControls = this.filterControls(masterDataConstant.masterDataSubCategory());
      this.createControls(masterDataConstant.masterDataSubCategory());
      // this.getRoleDropdownForUser('getAllMaster', 0, 'allSubCategoryDropdownList');
    }
    else if (this.activeTabNumber === 6) {
      this.masterModuleData = masterDataConstant.allAgDropdownList();
      this.getDropdownList('getAllMaster', masterDataConstant.allAgDropdownList(), this.masterDataToEdit);
      this.masterDataFormControls = this.filterControls(masterDataConstant.masterDataAg());
      this.createControls(masterDataConstant.masterDataAg());
      // this.getRoleDropdownForUser('getAllMaster', 0, 'allAgDropdownList');
    }
    else if (this.activeTabNumber === 7) {
      this.masterModuleData = masterDataConstant.allBrandNameDropdownList();
      this.getDropdownList('getAllMaster', masterDataConstant.allBrandNameDropdownList(), this.masterDataToEdit);
      this.masterDataFormControls = this.filterControls(masterDataConstant.masterDataBrandName());
      this.createControls(masterDataConstant.masterDataBrandName());
      // this.getRoleDropdownForUser('getAllMaster', 0, 'allBrandNameDropdownList');
    }
    else if (this.activeTabNumber === 2) {
      this.masterModuleData = masterDataConstant.allGenderDropdownList();
      this.masterDataFormControls = this.filterControls(masterDataConstant.masterDataGender());
      this.createControls(masterDataConstant.masterDataGender());
      this.getRoleDropdownForUser('getAllMaster', 0, 'allGenderDropdownList');
    }
    else if (this.activeTabNumber === 3) {
      this.masterModuleData = masterDataConstant.allBrandTypeDropdownList();
      this.getDropdownList('getAllMaster', masterDataConstant.allBrandTypeDropdownList(), this.masterDataToEdit);
      this.masterDataFormControls = this.filterControls(masterDataConstant.masterDataBrandType());
      this.createControls(masterDataConstant.masterDataBrandType());
    }
    else if (this.activeTabNumber === 4) {
      this.masterModuleData = masterDataConstant.allCategoryDropdownList();
      this.getDropdownList('getAllMaster', masterDataConstant.allCategoryDropdownList(), this.masterDataToEdit);
      this.masterDataFormControls = this.filterControls(masterDataConstant.masterDataCategory());
      this.createControls(masterDataConstant.masterDataCategory());
    }
    else {
      this.masterDataFormControls = this.filterControls(masterDataConstant.masterDataNames());
      this.createControls(masterDataConstant.masterDataNames());
    }
    if (this.masterDataToEdit?.id) {
      this.masterDataForm.patchValue(this.dataToEdit);
    }
  }

  getRoleDropdownForUser(methodName: string, startIndex: number, name: any) {
    const service = this.masterServiceApi as any;
    service[methodName](masterDataConstant[name as keyof typeof masterDataConstant]()[startIndex].path).subscribe((res: any) => {
      this.masterModuleData[startIndex].data = res;
      (this.masterModuleData)
      this.cd.detectChanges();
    }, (error: any) => {
      this.masterModuleData[startIndex].data = [];
    });
  }

  getCityByState(e: any, id: string, index: number, data: keyValue) {

    //Todo : remove two subscribe
    const arr = ['stateIdNo', 'companyIdNo', 'genderIdNo', 'brandtypeIdNo','brandTypeIdNo', 'categoryIdNo', 'subcategoryIdNo', 'agIdNo'];
    const ignoredTabNumber = [11];
    if (arr.includes(id) && !ignoredTabNumber.includes(index)) {
      if (e?.id && data?.path && data?.nextDropdownIndex && data?.nextDropdownName) {
        this.masterDataForm.controls[data.nextDropdownName].patchValue(null);

        if(id == 'stateIdNo'){
          this.masterServiceApi.getCityById(data.path, e.id).subscribe((list: any[]) => {
            this.masterModuleData[data.nextDropdownIndex as number].data = list;
            this.cd.detectChanges();
          }, (error) => {
            this.masterModuleData[data.nextDropdownIndex as number].data = [];
          });
        }else{
          this.masterServiceApi.getDataById(data.path, e.id).subscribe((list: any[]) => {
            this.masterModuleData[data.nextDropdownIndex as number].data = list;
            this.cd.detectChanges();
          }, (error) => {
            this.masterModuleData[data.nextDropdownIndex as number].data = [];
          });
        }
        
      } else {
        this.masterDataForm.controls[data.id]?.patchValue(e.id);
        this.masterDataForm.controls[data.nextDropdownName ? data.nextDropdownName : '']?.patchValue(null);
        if(this.masterModuleData[data?.nextDropdownIndex as any]){
          this.masterModuleData[data?.nextDropdownIndex as any].data = [];
        }
        this.cd.detectChanges();
      }
    }
    // });
  }

  getShowroomDropdownList(methodName: string) {
    const service = this.masterServiceApi as any;
    for (let i = 4; i < masterDataConstant.allShowroomDropDownData().length; i++) {
      service[methodName](masterDataConstant.allShowroomDropDownData()[i].path).subscribe((res: any) => {
        this.masterModuleData[i].data = res;
        this.cd.detectChanges();
      }, (error: any) => {
        this.masterModuleData[i].data = [];
      });
    }
  }

  getDropdownList(methodName: string, ddldata: any, masterDataToEdit: any ) {
    const service = this.masterServiceApi as any;
    // const ddldata = masterDataConstant.allSubCategoryDropdownList();
    for (let i = 0; i < ddldata.length; i++) {
      // if (masterDataConstant.allProductDropdownList()[i].path !== 'api/referencedata/gender'
      // && masterDataConstant.allProductDropdownList()[i].path !== 'api/referencedata/brandType'
      // && masterDataConstant.allProductDropdownList()[i].path !== 'api/referencedata/category') {
        const url = ddldata[i].dependent && masterDataToEdit[ddldata[i].dependent] 
                    ? ddldata[i].path + '/' + masterDataToEdit[ddldata[i].dependent] 
                    : ddldata[i].path
        service[methodName](url).subscribe((res: any) => {
          this.masterModuleData[i].data = res ? res : [];
          this.cd.detectChanges();
        }, (error: any) => {
          this.masterModuleData[i].data = [];
        });
      // }
    }
  }


  getAllDropdownOptions(methodName: string) {
    const service = this.masterServiceApi as any;
    for (let i = 0; i < masterDataConstant.allProductDropdownList().length; i++) {
      if (masterDataConstant.allProductDropdownList()[i].path !== 'api/referencedata/name' &&
        masterDataConstant.allProductDropdownList()[i].path !== 'api/referencedata/ag' &&
        masterDataConstant.allProductDropdownList()[i].path !== 'api/referencedata/sname' &&
        masterDataConstant.allProductDropdownList()[i].path !== 'api/referencedata/brandName') {
        service[methodName](masterDataConstant.allProductDropdownList()[i].path).subscribe((res: any) => {
          this.masterModuleData[i].data = res;
          this.cd.detectChanges();
        }, (error: any) => {
          this.masterModuleData[i].data = [];
        });
      }
    }
  }

  /**
   * @summary controlList this method will remove id and isActive field
   * @returns 
   */
  filterControls(controlList: keyValue[]): keyValue[] {
    return controlList.filter(x => x.id !== 'id' && x.id !== 'isActive');
  }

  createControls(controlsName: keyValue[]) {
    for (let i = 0; i < controlsName.length; i++) {
      const value = controlsName[i].id == 'isActive' ? true : controlsName[i].id == 'id' ? 0 : null;
      this.masterDataForm?.addControl(controlsName[i].id, this.fb.control(value, controlsName[i]?.notrequired ? null : Validators.required));
      this.validateControls(controlsName[i]);
    }
  }

  validateControls(controlsName: keyValue) {
    const controlID = controlsName.id;
    if (controlID == 'contactNo' || controlID == 'mobile') {
      this.masterDataForm.controls[controlID].addValidators([Validators.minLength(10), Validators.maxLength(10)]);
    }
    if (controlID == 'emailId' || controlID == 'email') {
      this.masterDataForm.controls[controlID].addValidators([Validators.email]);
    }
  }

  get masterDataFormControl() {
    return this.masterDataForm;
  }

  closeModal() {
    this.masterDataForm.reset();
    this.resetData.emit(this.masterDataForm.value);
    this.modal.close('Close click');
  }

  saveMasterData() {
    if (this.masterDataForm.valid) {
      this.masterDataValue.emit(this.masterDataForm.value);
      this.closeModal();
      // this.masterDataForm.reset();
    }
  }

  ngSelectOpen() {
    this.render.addClass(this.modelBody.nativeElement, 'overflow-visible');
    this.render.addClass(document.getElementsByClassName('modal-content')[0], 'overflow-visible');
  }

  ngSelectClose() {
    this.render.removeClass(this.modelBody.nativeElement, 'overflow-visible')
    this.render.removeClass(document.getElementsByClassName('modal-content')[0], 'overflow-visible');
  }

  ngOnDestroy(): void {
    this.masterDataForm.reset();
  }
}

