import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterModuleData } from './../../../../shared/shared.model';
import { FieldsValue, UserAccess } from './../../models/master.model';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-function',
  templateUrl: './user-function.component.html',
  styleUrls: ['./user-function.component.scss']
})
export class UserFunctionComponent implements OnInit {

  @HostBinding('class') class = 'p-3';

  @Input() modal: any;
  @Input() userAccessData: any;
  @Input() userAccessDropdown: MasterModuleData[];
  @Input() dependentDropdownList: MasterModuleData[];

  @Output() saveUserAccessData: EventEmitter<UserAccess> = new EventEmitter<UserAccess>();
  @Output() changedKey: EventEmitter<FieldsValue> = new EventEmitter<FieldsValue>();

  userAcessForm: FormGroup;
  formOldValue: any;
  ignoredFormKeys: string[] = ['brandnameId', 'periodId'];
  selectedKey: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buidForm();
    this.userAcessForm.patchValue(this.userAccessData.response)
    this.formOldValue = { ...this.userAcessForm.value };
    
    this.userAcessForm.valueChanges.subscribe((res: any) => {
      const key: string | undefined = Object.keys(res).find((k: string) => res[k as keyof typeof res] != this.formOldValue[k]);
      if (key && !this.ignoredFormKeys.includes(key)) {
        this.getDropdownListById(key);
      }
      this.formOldValue = { ...this.userAcessForm.value };
    });


  }

  getDropdownListById(changedKey: string | undefined) {
    if (changedKey) {
      this.selectDropdownList(changedKey);
      const changedItem: FieldsValue = {
        id: this.selectedKey,
        name: this.userAcessForm.value[changedKey]
      };
      this.changedKey.emit(changedItem);
    }
  }

  selectDropdownList(changedKey: string) {
    switch (changedKey) {
      case 'companyIds':
        // this.userAcessForm.controls.gender?.setValue(null);
        this.selectedKey = "gender";
        break;
      case 'genderIds':
        // this.userAcessForm.controls.brandType?.setValue(null);
        this.selectedKey = "brandtype";
        break;
      case 'brandtypeIds':
        // this.userAcessForm.controls.category?.setValue(null);
        this.selectedKey = "category";
        break;
      case 'categoryIds':
        // this.userAcessForm.controls.subcategory?.setValue(null);
        this.selectedKey = "subcategory";
        break;
      case 'subcategoryIds':
        // this.userAcessForm.controls.ag?.setValue(null);
        this.selectedKey = "ag";
        break;
      case 'agIds':
        // this.userAcessForm.controls.ag?.setValue(null);
        this.selectedKey = "brandname";
        break;
      case 'brandnameIds':
          // this.userAcessForm.controls.ag?.setValue(null);
          this.selectedKey = "";
          break;
    }
  }

  buidForm() {
    this.userAcessForm = this.fb.group({
      userId: [],
      companyIds: [],
      genderIds: [],
      brandtypeIds: [],
      categoryIds: [],
      subcategoryIds: [],
      agIds: [],
      brandnameIds: []
    });
  }

  closeModal() {
    this.modal.close('Close click');
  }

  saveUserData() {
    const value = this.userAcessForm.value;
    value.userId = this.userAccessData.response.userId
    this.saveUserAccessData.emit(value);
    this.closeModal();
  }
}