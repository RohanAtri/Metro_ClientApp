export interface LimitQuotaDropdownData {
    path: string;
    data: any;
    controlName: string;
}

export interface FieldsValue {
    id: number | string;
    name: string
}

export interface LimitAndQuotaHeaders {
    propName: string;
    placeHolderName: string;
    canEdit: boolean;
}
export interface LimitAndQuotaTable {
    header: LimitAndQuotaHeaders[],
    data: any[]
}

export interface TableOption {
    pageNo: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string
}

export interface FilterOptions {
    companyId: number;
    genderId: number;
    categoryId: number;
    subcategoryId: number;
    agId: number;
    brandtypeId: number;
    brandnameId: number;
    periodId: number;
}

export interface FilterControls {
    nextId: number,
    filters: FilterOptions,
    //fieldsValue :FieldsValue
}