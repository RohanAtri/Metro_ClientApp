import { DependentTableService } from './services/dependent-table.service';
import { UserCommunicationServiceService } from './services/user-communication-service.service';
import { ManagerService } from './services/manager.service';
import { ShowroomService } from './services/showroom.service';
import { ProductDataService } from './services/product-data.service';
import { masterDataConstant } from './constants/master.constants';
import { keyValue, MasterModuleData } from './../../shared/shared.model';
import { MasterService } from './services/master.service';
import { FieldsValue, MasterData, RoleFuncntion, RoleFunction, UserAccess } from './models/master.model';
import { MasterDataService } from './services/master-data-api.service';
import { Component, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MASTERAPI } from './constants/master.route';
import { UserService } from './services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoleFunctions } from 'src/app/shared/constants/shared.enums';
import { parentName } from './constants/master.enum';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})

export class MasterComponent implements OnInit {

  @ViewChild('content') private content: TemplateRef<any>;
  @ViewChild('contentRole') private contentRole: TemplateRef<any>;
  @ViewChild('contentUser') private contentUser: TemplateRef<any>;

  @HostBinding('class') class = 'h-100';

  tableData: MasterData[] = [];

  active: number = 1;
  service: MasterService | ProductDataService | ShowroomService | ManagerService | UserService | DependentTableService;
  masterDataTabs: keyValue[];
  dataToEdit: MasterData;
  roleDataToEdit: RoleFuncntion;
  userAccessData: any;
  modalTitle: string = 'Showroom';
  userAccessDropdownList: MasterModuleData[];
  userAccessDropdown: MasterModuleData[];
  fAccess: any;
  dependentDropdownList: MasterModuleData[];
  constructor(private toastService: ToastService, private modalService: NgbModal,
    private masterDataApiService: MasterDataService,
    private masterService: MasterService,
    private productService: ProductDataService,
    private managerService: ManagerService,
    private showroomService: ShowroomService,
    private userService: UserService,
    private authService: AuthService,
    private userCommunicationService: UserCommunicationServiceService,
    private dependentTableService: DependentTableService) { }

  ngOnInit(): void {
    this.masterDataTabs = masterDataConstant.masterDataHeaders();
    this.loadMasterDataComponent('getAllMaster');
    this.getDropdownList();
    this.fAccess = this.authService.getFunction(RoleFunctions.Masters);
  }

  openAddNewModal(content: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static', scrollable: true, size: this.active == 11 || this.active == 8 || this.active == 14 ? '' : 'sm' });
  }

  getData(tableName: string, methodName: any, value?: MasterData) {
    const service = this.masterDataApiService as any;

    service[methodName](tableName, value).subscribe((res: any) => {
      if (methodName == 'saveMasterData' || methodName == 'updateMasterData' || methodName == 'deleteMasterData') {
        this.toastService.show("Data saved successfully", { classname: 'bg-success text-white', delay: 3000 }); this.loadMasterDataComponent('getAllMaster');
      } else if (methodName === 'getById') {
        this.dataToEdit = res;
        this.openAddNewModal(this.content);
        return
      } else {
        this.tableData = res;
      }
    }, (error: any) => {
      if (methodName === 'getAllMaster') {
        this.tableData = [];
      }
      let er = "internal server error";
      this.toastService.show(er, { classname: 'bg-danger text-light', delay: 3000 });

    });
  }

  resetData(value: MasterData) {
    this.dataToEdit = value;
  }

  saveData(value: MasterData) {
    if (value.id) {
      this.loadMasterDataComponent('updateMasterData', value);
    } else {
      this.loadMasterDataComponent('saveMasterData', value);
    }
  }

  updateStatus(updatedData: MasterData) {
    this.loadMasterDataComponent('updateMasterData', updatedData);
  }

  getDataToEdit(value: MasterData) {
    this.loadMasterDataComponent('getById', value);
  }

  deleteData(dataToDelete: MasterData) {
    this.loadMasterDataComponent('deleteMasterData', dataToDelete);
  }

  action(value: MasterData) {
    if (this.active == 13) {
      this.getRoleById(value);
    } else {
      this.getUserRoleById(value);
    }
  }

  getRoleById(value: MasterData) {
    this.masterDataApiService.getRoleFunctionByRoleId(value.id).subscribe(
      (response) => {
        this.roleDataToEdit = { response: response, id: value.id };
        this.modalService.open(this.contentRole, { centered: true, backdrop: 'static', scrollable: true, size: 'lg' });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUserRoleById(value: MasterData) {
    this.masterDataApiService.getUserAccessData(value.id).subscribe(
      (response) => {
        this.userAccessData = { response: response, id: value.id };
        this.getDependentDropdownList();
        this.modalService.open(this.contentUser, { centered: true, backdrop: 'static', scrollable: true, size: 'md' });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveUserAccessData(userAccessData: UserAccess) {
    const path = `api/roles/useraccess/${userAccessData.userId}`
    this.masterDataApiService.saveMasterData(path, userAccessData).subscribe((res) => {
      this.toastService.show("Data saved successfully", { classname: 'bg-success text-white', delay: 3000 });

    });
  }

  getUserAccessDropdownList() {
    this.userAccessDropdownList = masterDataConstant.UserAccessDropdownList();
    for (let i = 0; i < masterDataConstant.UserAccessDropdownList().length; i++) {
      this.masterDataApiService.getAllMaster(masterDataConstant.UserAccessDropdownList()[i].path).subscribe((res: any) => {
        this.userAccessDropdownList[i].data = res;
      });
    }
    this.userCommunicationService.sendDropdownList(this.userAccessDropdownList);
  }

  getDependentDropdownList() {
    // this.userAccessData
    this.dependentDropdownList = masterDataConstant.dependentDropdownList();
    for (let i = 0; i < masterDataConstant.dependentDropdownList().length; i++) {
      // this.masterDataApiService.getAllMaster(masterDataConstant.UserAccessDropdownList()[i].path).subscribe((res: any) => {
      //   this.userAccessDropdownList[i].data = res;
      // });
      const key: MasterModuleData = masterDataConstant.dependentDropdownList()[i];
      const values: string = this.userAccessData.response[key.controlName]?.join()?.split(',');
      const changedItem: FieldsValue = {
        id: key.path,
        name: []
      };
      if (values) {
        this.masterDataApiService.getAllMaster(`api/referencedata/all/${key.path}/${values}`).subscribe((res) => {
          const changedItem: FieldsValue = {
            id: key.path,
            name: []
          };
          this.appendListToDropdown(changedItem, res);
        }, (error) => {
          this.appendListToDropdown(changedItem, []);
        });
      }
    }
    // this.userCommunicationService.sendDropdownList(this.userAccessDropdownList);
  }

  getDropdownList() {
    this.dependentDropdownList = masterDataConstant.dependentDropdownList();
    this.userCommunicationService.getDropdownList().subscribe((res: MasterModuleData[]) => {
      this.userAccessDropdown = res;
    });
  }

  saveRole(data: RoleFunction) {
    const path: string = `api/roles/${data.roleId}`;
    delete data.roleId;
    this.masterDataApiService.saveMasterData(path, data).subscribe((res: any) => {
      this.toastService.show("Data saved successfully", { classname: 'bg-success text-white', delay: 3000 });

    });
  }


  changedKey(key: FieldsValue) {
    // if (key.id) {
    this.masterDataApiService.getAllMaster(`api/referencedata/all/${key.id}/${key.name.join().split(',')}`).subscribe((res) => {
      this.appendListToDropdown(key, res);
    }, (error) => {
      this.appendListToDropdown(key, []);
    });
    //this.dependentDropdownList = limitQuota.dependentDropdownList;
    // }
  }

  appendListToDropdown(key: any, res: any) {
    //masterDataConstant.dependentDropdownList = 
    this.dependentDropdownList.map(
      (x: MasterModuleData) => {
        if (x.path == key.id) {
          x.data = [...res];
        }
        return x;
      });
  }

  loadMasterDataComponent(methodName: string, value: any = null) {
    this.modalTitle = masterDataConstant.masterDataHeaders()[this.active - 1]?.name;
    switch (this.active) {
      case 1:
        this.service = this.masterService;
        this.getData(MASTERAPI.COMPANY, methodName, value);
        break;
      case 2:
        parentName.name = 'Company';
        this.service = this.dependentTableService;
        this.getData(MASTERAPI.GENDER, methodName, value);
        break;
      case 3:
        parentName.name = 'Gender';
        this.service = this.dependentTableService;
        this.getData(MASTERAPI.BRAND_TYPE, methodName, value);
        break;
      case 4:
        parentName.name = 'Brand Type';
        this.service = this.dependentTableService;
        this.getData(MASTERAPI.CATEGORY, methodName, value);
        break;
      case 5:
        parentName.name = 'Category';
        this.service = this.dependentTableService;
        this.getData(MASTERAPI.SUB_CATEGORY, methodName, value);
        break;
      case 6:
        parentName.name = 'Sub Category';
        this.service = this.dependentTableService;
        this.getData(MASTERAPI.AG, methodName, value);
        break;
      case 7:
        parentName.name = 'AG';
        this.service = this.dependentTableService;
        this.getData(MASTERAPI.BRAND_NAME, methodName, value);
        break;
      case 8:
        this.service = this.productService;
        this.getData(MASTERAPI.PRODUCT, methodName, value);
        break;
      case 9:
        this.service = this.masterService;
        this.getData(MASTERAPI.SHOWROOM_TYPE, methodName, value);
        break;
      case 10:
        this.service = this.managerService;
        this.getData(MASTERAPI.MANAGER, methodName, value);
        break;
      case 11:
        this.service = this.showroomService;
        this.getData(MASTERAPI.SHOWROOM, methodName, value);
        break;
      case 12:
        this.service = this.masterService;
        this.getData(MASTERAPI.PERIOD, methodName, value);
        break;
      case 13:
        this.service = this.masterService;
        this.getData(MASTERAPI.ROLE, methodName, value);
        break;
      case 14:
        this.service = this.userService;
        this.getUserAccessDropdownList();
        this.getData(MASTERAPI.USER, methodName, value);
        break;
    }
  }
}