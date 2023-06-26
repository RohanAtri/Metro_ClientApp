import { distributionConstant } from './../constant/distribuutions.constant';
import { FilterForm, FieldsValue } from './../../../shared/shared.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistributionDropdownData } from './../models/distribution.model';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DISTRIBUTION, DistributionPath } from '../constant/distribution.enums';
import { HttpParams } from '@angular/common/http';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ReferenceUploadsComponent } from '../reference-uploads/reference-uploads.component';
import { Model } from '../reference-uploads/model';
import { DistributionApiService } from '../services/distribution-api.service';

@Component({
  selector: 'app-d-options',
  templateUrl: './d-options.component.html',
  styleUrls: ['./d-options.component.scss']
})
export class DOptionsComponent implements OnInit {

  // @ViewChild('content') private content: TemplateRef<any>;
  @ViewChild('gender') gender: NgSelectComponent;
  @ViewChild('brandType') brandType: NgSelectComponent;
  @ViewChild('category') category: NgSelectComponent;
  @ViewChild('subCategory') subCategory: NgSelectComponent;
  @ViewChild('agId') agId: NgSelectComponent;
  @ViewChild('brandName') brandName: NgSelectComponent;

  @Input() dropdownList: DistributionDropdownData[];
  @Input() dependentDropdownList: DistributionDropdownData[];
  @Input() access: any;
  @Input() tabIndex: number;

  @Output() filterData: EventEmitter<any> = new EventEmitter<any>();
  @Output() periodChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() downloadData: EventEmitter<HttpParams> = new EventEmitter<HttpParams>();
  @Output() changedKey: EventEmitter<FieldsValue> = new EventEmitter<FieldsValue>();
  @Output() showLakhs: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup;
  formOldValue: any;
  ignoredFormKeys: string[] = ['brandnameId', 'periodId'];
  selectedKey: string;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private model: Model, private service: DistributionApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void { 
    this.buildFilterForm();
    this.dropdownControls();
    this.getDefaultDropdownList();
    this.formOldValue = { ...this.filterForm.value };
  }

  getDefaultDropdownList() {
    this.service.getDefaultDropdown().subscribe((res: any) => {
      // console.log(res);
      const j = {
        agId: res.agId ? +res.agId : null,
        brandnameId: res.brandnameId ? +res.brandnameId : null,
        brandtypeId: res.brandtypeId ? +res.brandtypeId : null,
        categoryId: res.categoryId ? +res.categoryId : null,
        companyId: res.companyId ? +res.companyId : null,
        genderId: res.genderId ? +res.genderId : null,
        periodId: res.periodId ? +res.periodId : null,
        subcategoryId: res.subcategoryId ? +res.subcategoryId : null,
      }
      // res = res.map((x: any) => +x)
      this.filterForm.patchValue(j);
      this.cd.detectChanges();
      this.getDistributionByFilter();
    }, (error) => {

    });
  }

  //important operation 
  /**
   * @author JAY
   */
  dropdownControls() {
    this.filterForm.valueChanges.subscribe((res: FilterForm) => {
      const key: string | undefined = Object.keys(res).find((k: string) => res[k as keyof typeof res] != this.formOldValue[k]);
      this.formOldValue = { ...this.filterForm.value };
      if (key && !this.ignoredFormKeys.includes(key)) {
        this.getDropdownListById(key);
      }
    });
  }

  getDropdownListById(changedKey: string | undefined) {
    if (changedKey) {
      this.selectDropdownList(changedKey);
      const changedItem: FieldsValue = {
        id: this.selectedKey,
        name: this.filterForm.value[changedKey]
      };
      this.changedKey.emit(changedItem);
    }
  }

  selectDropdownList(changedKey: string) {
    switch (changedKey) {
      case 'companyId':
        this.gender?.handleClearClick();
        this.filterForm.controls.gender?.setValue(null);
        // this.filterForm.get('subCategory')?.updateValueAndValidity();
        this.selectedKey = DISTRIBUTION.GENDER;
        // this.resetDropdownList(0);
        break;
      case 'genderId':
        this.brandType?.handleClearClick();
        this.filterForm.controls.brandType?.setValue(null);
        // this.filterForm.get('subCategory')?.updateValueAndValidity();
        this.selectedKey = DISTRIBUTION.BRAND_TYPE;
        // this.resetDropdownList(0);
        break;
      case 'brandtypeId':
          this.category?.handleClearClick();
          this.filterForm.controls.category?.setValue(null);
          // this.filterForm.get('subCategory')?.updateValueAndValidity();
          this.selectedKey = DISTRIBUTION.CATEGORY;
          // this.resetDropdownList(0);
          break;
      case 'categoryId':
        this.subCategory?.handleClearClick();
        this.filterForm.controls.subCategory?.setValue(null);
        // this.filterForm.get('subCategory')?.updateValueAndValidity();
        this.selectedKey = DISTRIBUTION.SUB_CATEGORY;
        // this.resetDropdownList(0);
        break;
      case 'subcategoryId':
        this.agId?.handleClearClick();
        this.selectedKey = DISTRIBUTION.AG;
        // this.resetDropdownList(1);
        break;
      case 'agId':
        this.brandName?.handleClearClick();
        this.selectedKey = DISTRIBUTION.BRAND_NAME;
        // this.resetDropdownList(2);
        break;
    }
    // if(this.filterForm.valid){
    //   this.getDistributionByFilter();
    // }
  }


  resetDropdownList(startIndex: number) {
    for (let i = startIndex; i <= this.dependentDropdownList.length; i++) {
      this.dependentDropdownList[i].data = [];
    }
  }

  buildFilterForm(values: any = null) {
    this.filterForm = this.fb.group({
      companyId: [values ?? values?.companyId, Validators.required],
      genderId: [values ?? values?.genderId, Validators.required],
      brandtypeId: [values ?? values?.brandtypeId, Validators.required],
      categoryId: [values ?? values?.categoryId, Validators.required],
      subcategoryId: [values ?? values?.subcategoryId],
      agId: [values ?? values?.agId],
      brandnameId: [values ?? values?.brandnameId],
      periodId: [values ?? values?.periodId, Validators.required]
    });
  }

  periodChanged(periodId: number) {
    this.periodChange.emit(periodId);
    this.getDistributionByFilter();
  }

  getDistributionByFilter() {
    const filterControl = {
      path: DistributionPath.DISTRIBUTIONAPIPATH,
      filters: this.filterForm.value
    }
    this.filterData.emit(filterControl);
  }

  openUploadDialog(content: any) {

    if (this.tabIndex === 1) {
      this.model.name = 'distribution';
    } else {
      this.model.name = 'showroom';
    }

    const modal: NgbModalRef = this.modalService.open(content, { centered: true, size: 'sm' });
    (<ReferenceUploadsComponent>modal.componentInstance).data = 'distribution';
  }

  download() {

    let params: HttpParams = new HttpParams();

    Object.keys(this.filterForm.value).forEach((key) => {
      if (this.filterForm.value[key] !== null) {
        params = params.set(`FilterOptions.${key}`, this.filterForm.value[key]);
      }
    })

    this.downloadData.emit(params);
  }

  public get isValid() {
    return !this.filterForm.controls["companyId"].value === null && !this.filterForm.controls["genderId"].value && !this.filterForm.controls["brandtypeId"].value && !this.filterForm.controls["categoryId"].value && !this.filterForm.controls["periodId"].value;
  }

  
 
  toggleShowLakhs($event: any){
    this.showLakhs.emit($event.target.checked === true);
  }

}
