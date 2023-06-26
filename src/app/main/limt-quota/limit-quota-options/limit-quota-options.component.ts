import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DISTRIBUTION } from '../../distribution/constant/distribution.enums';
import { Model } from '../../distribution/reference-uploads/model';
import { ReferenceUploadsComponent } from '../../distribution/reference-uploads/reference-uploads.component';
import { LimitAndQuotaApiService } from '../services/limit-and-quota-api.service';
import { FieldsValue, FilterControls, FilterOptions, LimitQuotaDropdownData } from './../models/limit-quota-interface';

@Component({
  selector: 'app-limit-quota-options',
  templateUrl: './limit-quota-options.component.html',
  styleUrls: ['./limit-quota-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LimitQuotaOptionsComponent implements OnInit {

  @Input() dropdownList: LimitQuotaDropdownData[];
  @Input() activeTab: number;
  @Input() resetDropdownFilters: boolean;
  @Input() access: any;
  @Input() showOption: boolean;

  @Output() filterOptions: EventEmitter<FilterControls> = new EventEmitter<FilterControls>();
  @Output() downloadData: EventEmitter<HttpParams> = new EventEmitter<HttpParams>();

  @Output() periodChange: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup;
  formOldValue: any;
  @Input() dependentDropdownList: LimitQuotaDropdownData[];
  ignoredFormKeys: string[] = ['categoryId','subcategoryId','agId','brandnameId', 'periodId'];
  selectedKey: string;
  
  @ViewChild('gender') gender: NgSelectComponent;
  @ViewChild('brandType') brandType: NgSelectComponent;
  @ViewChild('category') category: NgSelectComponent;
  @Output() changedKey: EventEmitter<FieldsValue> = new EventEmitter<FieldsValue>();
  
  constructor(private fb: FormBuilder, private modalService: NgbModal, private model: Model, private service: LimitAndQuotaApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.buildFilterForm();
    // this.getDefaultDropdownList();
    this.formOldValue = { ...this.filterForm.value };

    this.filterForm.valueChanges.subscribe((res: FilterOptions) => {
      const key: string | undefined = Object.keys(res).find((k: string) => res[k as keyof typeof res] != this.formOldValue[k]);
      //
      if (key && !this.ignoredFormKeys.includes(key)) {
        this.getDropdownListById(key);
      }
      
      this.formOldValue = { ...this.filterForm.value };
      this.filterTable(res);
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
      // case 'categoryId':
      //   this.subCategory?.handleClearClick();
      //   this.filterForm.controls.subCategory?.setValue(null);
      //   // this.filterForm.get('subCategory')?.updateValueAndValidity();
      //   this.selectedKey = DISTRIBUTION.SUB_CATEGORY;
      //   // this.resetDropdownList(0);
      //   break;
      // case 'subcategoryId':
      //   this.agId?.handleClearClick();
      //   this.selectedKey = DISTRIBUTION.AG;
      //   // this.resetDropdownList(1);
      //   break;
      // case 'agId':
      //   this.brandName?.handleClearClick();
      //   this.selectedKey = DISTRIBUTION.BRAND_NAME;
      //   // this.resetDropdownList(2);
      //   break;
    }
    // if(this.filterForm.valid){
    //   this.getDistributionByFilter();
    // }
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
      // this.filterTable(this.filterForm.value);
    }, (error) => {

    });
  }

  filterTable(filters: FilterOptions) {
    const controls = {
      nextId: this.activeTab,
      filters: filters
    }
    this.filterOptions.emit(controls);
  }

  periodChanged(periodId: number) {
    this.periodChange.emit(periodId);
  }

  ngOnChanges() {
    if (this.resetDropdownFilters) {
      this.filterForm.reset();
    }
    if (this.showOption) {
      this.getDefaultDropdownList();
    }
  }

  buildFilterForm() {
    this.filterForm = this.fb.group({
      companyId: [],
      genderId: [],
      categoryId: [],
      subcategoryId: [],
      agId: [],
      brandtypeId: [],
      brandnameId: [],
      periodId: []
    });
  }

  download() {

    let params: HttpParams = new HttpParams();

    Object.keys(this.filterForm.value).forEach((key) => {
      if (this.filterForm.value[key] !== null) {
        params = params.set(`FilterOptions.${key}`, this.filterForm.value[key]);
      }
    })

    params = params.set(`FilterOptions.brandnameId`, 0);
    this.downloadData.emit(params);
  }

  public openUploadDialog(content: any): void {

    if (this.activeTab === 1) {
      this.model.name = 'category';
    } else {
      this.model.name = "company";
    }

    const modal: NgbModalRef = this.modalService.open(content, { backdrop: "static", centered: true, size: 'sm' });
    const modalComponent: ReferenceUploadsComponent = modal.componentInstance;

    modal.result.then(
      (result) => {
        // this.updateBindings();
      },
      () => { });
  }

}
