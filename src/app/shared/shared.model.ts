export interface menuList {
    id: number;
    name: string;
    function: string,
    path: string;
}
export interface keyValue {
    id: any;
    name: string;
    type?: 'select' | 'text' | 'date';
    path?: string;
    notrequired?: boolean;
    nextDropdownIndex?: number;
    nextDropdownName?: string;
    isDisable?: boolean;
}
export class TableColumnSettings {
    id: string;
    title: string;
    dataPropName: string;
    templateName: string;
    width: string;
    status?: boolean;
    action?: boolean;
}

export class ManagerTable {
    id: number;
    isActive: boolean;
    name: string;
    sname: string;
    contactNo: number;
    emailId: string;
}

export interface MasterModuleData {
    path: string;
    data: FieldsValue[];
    controlName: string;
}

export interface FieldsValue {
    id: number | string;
    name: string
}

export interface FilterForm {
    companyId: number;
    genderId: number;
    categoryId: number;
    subcategoryId: number;
    agId: number;
    brandtypeId: number;
    brandnameId: number;
    periodId: number;
}
export interface PaginationOptions {
    currentPage: number;
    recordPerPage: number;
}

// {
//     "cityManagerName": "Test Mgr",
//     "regionalManagerName": "Test Mgr",
//     "showroomManagerName": "Test Mgr",
//     "brandNameName": "Metro",
//     "stateName": "Maha",
//     "cityName": "Mum",
//     "shrmTypeName": "High-Street",
//     "id": 1,
//     "acnm": "test",
//     "acname": "test name",
//     "cityManagerIdNo": 1,
//     "regionalManagerIdNo": 1,
//     "showroomManagerIdNo": 1,
//     "etpAcnm": "test",
//     "sapAcnm": null,
//     "brandNameIdNo": 1,
//     "stateIdNo": 1,
//     "cityIdNo": 1,
//     "zone": "EAST",
//     "shrmTypeIdNo": 1,
//     "opDate": null,
//     "clDate": null,
//     "isActive": true
//   }