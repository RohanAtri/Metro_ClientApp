import { keyValue, MasterModuleData } from './../../../shared/shared.model';
import { GETDROPDOWNLIST } from './master.route';
class MasterDataConstant {



    masterDataHeaders(): keyValue[] {
        let header: keyValue[] = [];
        header = [
            {
                id: 1,
                name: 'Company'
            },
            {
                id: 2,
                name: 'Gender'
            },
            {
                id: 3,
                name: 'Brand Type'
            },
            {
                id: 5,
                name: 'Category'
            },
            {
                id: 6,
                name: 'Sub Category'
            },
            {
                id: 7,
                name: 'AG'
            },
            {
                id: 4,
                name: 'Brand Name'
            },
            {
                id: 8,
                name: 'Product'
            },
            {
                id: 9,
                name: 'Showroom Type'
            },
            {
                id: 10,
                name: 'Manager'
            },
            {
                id: 11,
                name: 'Showroom'
            },
            {
                id: 12,
                name: 'Period Master'
            },

            {
                id: 13,
                name: 'Role Master'
            }
            ,
            {
                id: 14,
                name: 'User Master'
            }
        ];
        return header;
    }
    //TODO 
    productControlNames(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID' },
            { id: "companyIdNo", name: 'Company*', type: 'select', path: GETDROPDOWNLIST.GENDER, nextDropdownIndex: 1, nextDropdownName: 'genderIdNo' },
            { id: "genderIdNo", name: 'Gender*', type: 'select', path: GETDROPDOWNLIST.BRAND_TYPE, nextDropdownIndex: 2, nextDropdownName: 'brandTypeIdNo' },
            { id: "brandTypeIdNo", name: "Brand Type*", type: 'select', path: GETDROPDOWNLIST.CATEGORY, nextDropdownIndex: 3, nextDropdownName: 'categoryIdNo' },
            { id: "categoryIdNo", name: 'Category*', type: 'select', path: GETDROPDOWNLIST.SUB_CATEGORY, nextDropdownIndex: 4, nextDropdownName: 'subcategoryIdNo' },
            { id: "subcategoryIdNo", name: "Sub Category*", type: 'select', path: GETDROPDOWNLIST.AG, nextDropdownIndex: 5, nextDropdownName: 'agIdNo' },
            { id: "agIdNo", name: 'AG*', type: 'select', path: GETDROPDOWNLIST.BRAND_NAME, nextDropdownIndex: 6, nextDropdownName: 'brandNameIdNo' },
            { id: "brandNameIdNo", name: 'Brand Name*', type: 'select' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status*' }];
        return productControl;
    }

    allProductDropdownList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [] },
            { path: GETDROPDOWNLIST.GENDER, data: [], dependent: "companyIdNo" },
            { path: GETDROPDOWNLIST.BRAND_TYPE, data: [],dependent: "genderIdNo"  },
            { path: GETDROPDOWNLIST.CATEGORY, data: [], dependent: "brandtypeIdNo"  },
            { path: GETDROPDOWNLIST.SUB_CATEGORY, data: [] , dependent: "categoryIdNo"},
            { path: GETDROPDOWNLIST.AG, data: [], dependent: "subcategoryIdNo" },
            { path: GETDROPDOWNLIST.BRAND_NAME, data: [] },
            // { path: GETDROPDOWNLIST.NAME, data: [] },
            // { path: GETDROPDOWNLIST.SNAME, data: [] },
        ];
    }

    allSubCategoryDropdownList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [] },
            { path: GETDROPDOWNLIST.GENDER, data: [], dependent: "companyIdNo" },
            { path: GETDROPDOWNLIST.BRAND_TYPE, data: [],dependent: "genderIdNo"  },
            { path: GETDROPDOWNLIST.CATEGORY, data: [], dependent: "brandtypeIdNo"  }
        ];
    }
    allAgDropdownList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [] },
            { path: GETDROPDOWNLIST.GENDER, data: [], dependent: "companyIdNo" },
            { path: GETDROPDOWNLIST.BRAND_TYPE, data: [],dependent: "genderIdNo"  },
            { path: GETDROPDOWNLIST.CATEGORY, data: [], dependent: "brandtypeIdNo"  },
            { path: GETDROPDOWNLIST.SUB_CATEGORY, data: [] , dependent: "categoryIdNo"}
        ];
    }
    allBrandNameDropdownList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [] },
            { path: GETDROPDOWNLIST.GENDER, data: [], dependent: "companyIdNo" },
            { path: GETDROPDOWNLIST.BRAND_TYPE, data: [],dependent: "genderIdNo"  },
            { path: GETDROPDOWNLIST.CATEGORY, data: [], dependent: "brandtypeIdNo"  },
            { path: GETDROPDOWNLIST.SUB_CATEGORY, data: [] , dependent: "categoryIdNo"},
            { path: GETDROPDOWNLIST.AG, data: [], dependent: "subcategoryIdNo" },
        ];
    }
    allGenderDropdownList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [] },
        ];
    }

    allBrandTypeDropdownList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [] },
            { path: GETDROPDOWNLIST.GENDER, data: [], dependent: "companyIdNo"  },
        ];
    }
    allCategoryDropdownList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [] },
            { path: GETDROPDOWNLIST.GENDER, data: [], dependent: "companyIdNo" },
            { path: GETDROPDOWNLIST.BRAND_TYPE, data: [],dependent: "genderIdNo"  }
        ];
    }
    allManagerTypeList(): MasterModuleData[] | any[] {
        return [
            { path: GETDROPDOWNLIST.MANAGER_TYPE, data: [] },
        ];
    }
    allShowroomDropDownData(): MasterModuleData[] {
        return [
            { path: GETDROPDOWNLIST.ACNM, data: [], controlName: '' },
            { path: GETDROPDOWNLIST.ACNAME, data: [], controlName: '' },
            { path: GETDROPDOWNLIST.ETPACNM, data: [], controlName: '' },
            { path: GETDROPDOWNLIST.SAPACNM, data: [], controlName: '' },
            { path: GETDROPDOWNLIST.ZONE, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.COMPANY, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.STATE, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.CITY, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.CITY_MANAGER, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.REGIONAL_MANAGER, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.SHOWROOM_MANAGER, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.SHOWROOM_TYPE, data: [] , controlName: ''},
        ]
    }

    allUserDropdown(): MasterModuleData[] {
        return [
            { path: GETDROPDOWNLIST.NAME, data: [], controlName: '' },
            { path: GETDROPDOWNLIST.PASSWORD, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.USERNAME, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.EMAILID, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.MOBILE_NO, data: [] , controlName: ''},
            { path: GETDROPDOWNLIST.ROLE, data: [] , controlName: ''}
        ]
    }

    userControlNames(): keyValue[] {
        return [
            { id: "id", name: 'ID', type: 'text' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "password", name: 'Password', type: 'text', notrequired: true },
            { id: "userName", name: 'User Name*', type: 'text' },
            { id: "email", name: 'Email ID*', type: 'text' },
            { id: "mobile", name: 'Mobile*', type: 'text' },
            { id: "roleIdNo", name: 'Role Name*', type: 'select' },
            { id: "isActive", name: 'Status*', type: 'text' }
        ]
    }

    showroomControlNames(): keyValue[] {
        return [
            { id: "id", name: 'ID' },
            { id: "acnm", name: 'ACNM*', type: 'text' },
            { id: "acname", name: 'ACName*', type: 'text' },
            { id: "etpAcnm", name: 'ETP ACNM*', type: 'text' },
            { id: "sapAcnm", name: 'SAP ACNM*', type: 'text' },
            { id: "zone", name: 'Zone*', type: 'text' },
            { id: "brandNameIdNo", name: 'Brand Name*', type: 'select' },
            { id: "stateIdNo", name: 'State*', type: 'select', path: GETDROPDOWNLIST.CITY, nextDropdownIndex: 7 },
            { id: "cityIdNo", name: 'City*', type: 'select' },
            { id: "cityManagerIdNo", name: 'City Manager*', type: 'select' },
            { id: "regionalManagerIdNo", name: 'Regional Manager*', type: 'select' },
            { id: "showroomManagerIdNo", name: 'Showroom Manager*', type: 'select' },
            { id: "shrmTypeIdNo", name: 'SHRM Type*', type: 'select' },
            { id: "opDate", name: 'OP Date', type: 'date', notrequired: true },
            { id: "clDate", name: 'CL Date', type: 'date', notrequired: true },
            { id: "isActive", name: 'Status*', type: 'text' }
        ]
    }

    managerSection(): keyValue[] {
        return [
            { id: "id", name: 'ID', type: 'text' },
            { id: "managerTypeId", name: 'Manager Type', type: 'select' },
            { id: "name", name: 'Name', type: 'text' },
            { id: "contactNo", name: 'Contact No.', type: 'text' },
            { id: "emailId", name: 'Email Id', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
    }

    masterDataNames(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID*', type: 'text' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
        return productControl;
    }

    // allSubCategoryDropdownList(): MasterModuleData[] | any[] {
    //     return [
    //         { id: "companyIdNo", name: 'Company*', type: 'select', path: GETDROPDOWNLIST.GENDER, nextDropdownIndex: 2, nextDropdownName: 'genderIdNo'  },
    //         { id: "genderIdNo", name: 'Gender*', type: 'select', path: GETDROPDOWNLIST.BRAND_TYPE, nextDropdownIndex: 3, nextDropdownName: 'brandtypeIdNo'  },
    //         { id: "brandTypeIdNo", name: "Brand Type*", type: 'select', path: GETDROPDOWNLIST.CATEGORY, nextDropdownIndex: 4, nextDropdownName: 'categoryIdNo'  },
    //         { id: "categoryIdNo", name: 'Category*', type: 'select', path: GETDROPDOWNLIST.SUB_CATEGORY, nextDropdownIndex: 5, nextDropdownName: 'subcategoryIdNo' },
            
    //     ];
    // }

    masterDataSubCategory(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID', type: 'text' },
            { id: "companyIdNo", name: 'Company*', type: 'select', path: GETDROPDOWNLIST.GENDER, nextDropdownIndex: 1, nextDropdownName: 'genderIdNo' },
            { id: "genderIdNo", name: 'Gender*', type: 'select', path: GETDROPDOWNLIST.BRAND_TYPE, nextDropdownIndex: 2, nextDropdownName: 'brandtypeIdNo' },
            { id: "brandtypeIdNo", name: 'Brandtype*', type: 'select', path: GETDROPDOWNLIST.CATEGORY, nextDropdownIndex: 3, nextDropdownName: 'categoryIdNo'   },
            { id: "categoryIdNo", name: 'Category*', type: 'select'},
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
        return productControl;
    }

    masterDataAg(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID', type: 'text' },
            { id: "companyIdNo", name: 'Company*', type: 'select', path: GETDROPDOWNLIST.GENDER, nextDropdownIndex: 1, nextDropdownName: 'genderIdNo' },
            { id: "genderIdNo", name: 'Gender*', type: 'select', path: GETDROPDOWNLIST.BRAND_TYPE, nextDropdownIndex: 2, nextDropdownName: 'brandtypeIdNo' },
            { id: "brandtypeIdNo", name: 'Brandtype*', type: 'select', path: GETDROPDOWNLIST.CATEGORY, nextDropdownIndex: 3, nextDropdownName: 'categoryIdNo'   },
            { id: "categoryIdNo", name: 'Category*', type: 'select', path: GETDROPDOWNLIST.SUB_CATEGORY, nextDropdownIndex: 4, nextDropdownName: 'subcategoryIdNo'},
            { id: "subcategoryIdNo", name: 'Sub Category*', type: 'select' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
        return productControl;
    }

    masterDataBrandName(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID', type: 'text' },
            { id: "companyIdNo", name: 'Company*', type: 'select', path: GETDROPDOWNLIST.GENDER, nextDropdownIndex: 1, nextDropdownName: 'genderIdNo' },
            { id: "genderIdNo", name: 'Gender*', type: 'select', path: GETDROPDOWNLIST.BRAND_TYPE, nextDropdownIndex: 2, nextDropdownName: 'brandtypeIdNo' },
            { id: "brandtypeIdNo", name: 'Brandtype*', type: 'select', path: GETDROPDOWNLIST.CATEGORY, nextDropdownIndex: 3, nextDropdownName: 'categoryIdNo'   },
            { id: "categoryIdNo", name: 'Category*', type: 'select', path: GETDROPDOWNLIST.SUB_CATEGORY, nextDropdownIndex: 4, nextDropdownName: 'subcategoryIdNo'},
            { id: "subcategoryIdNo", name: 'Sub Category*', type: 'select', path: GETDROPDOWNLIST.AG, nextDropdownIndex: 5, nextDropdownName: 'agIdNo'    },
            { id: "agIdNo", name: 'AG*', type: 'select' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
        return productControl;
    }

    masterDataGender(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID', type: 'text' },
            { id: "companyIdNo", name: 'Company*', type: 'select' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
        return productControl;
    }

    masterDataBrandType(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID', type: 'text' },
            { id: "companyIdNo", name: 'Company*', type: 'select', path: GETDROPDOWNLIST.GENDER, nextDropdownIndex: 1, nextDropdownName: 'genderIdNo' },
            { id: "genderIdNo", name: 'Gender*', type: 'select' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
        return productControl;
    }

    masterDataCategory(): keyValue[] {
        let productControl: keyValue[] = [];
        productControl = [
            { id: "id", name: 'ID', type: 'text' },
            { id: "companyIdNo", name: 'Company*', type: 'select', path: GETDROPDOWNLIST.GENDER, nextDropdownIndex: 1, nextDropdownName: 'genderIdNo' },
            { id: "genderIdNo", name: 'Gender*', type: 'select', path: GETDROPDOWNLIST.BRAND_TYPE, nextDropdownIndex: 2, nextDropdownName: 'brandtypeIdNo' },
            { id: "brandtypeIdNo", name: 'Brandtype*', type: 'select' },
            // { id: "brandTypeIdNo", name: 'Brand Type*', type: 'select' },
            { id: "name", name: 'Name*', type: 'text' },
            { id: "sName", name: 'SName*', type: 'text' },
            { id: "isActive", name: 'Status', type: 'text' }
        ];
        return productControl;
    }

    UserAccessDropdownList(): MasterModuleData[] {
        return [
            { path: GETDROPDOWNLIST.COMPANY, data: [], controlName: '' },
            // { path: GETDROPDOWNLIST.GENDER, data: [] },
            // { path: GETDROPDOWNLIST.BRAND_TYPE, data: [] },
            // { path: GETDROPDOWNLIST.CATEGORY, data: [] },
            // { path: GETDROPDOWNLIST.SUB_CATEGORY, data: [] },
            // { path: GETDROPDOWNLIST.AG, data: [] },
            // { path: GETDROPDOWNLIST.BRAND_NAME, data: [] },
        ];
    }
    
    dependentDropdownList(): MasterModuleData[] { 
        return [
            { path: 'gender', data: [], controlName: 'companyIds' },
            { path: 'brandtype', data: [], controlName: 'genderIds' },
            { path: 'category', data: [], controlName: 'brandtypeIds' },
            { path: 'subcategory', data: [],controlName: 'categoryIds' },
            { path: 'ag', data: [],controlName: 'subcategoryIds' },
            { path: 'brandname', data: [],controlName: 'agIds'  },
        ];
    }
    // parentNameHeading: string;
}

export const masterDataConstant = new MasterDataConstant();