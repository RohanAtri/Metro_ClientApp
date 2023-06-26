export interface MasterData {
    id: number,
    name: string,
    sName: string,
    isActive?: boolean
}

export interface RoleFuncntion {
    id: number;
    response: MasterData,
}

export interface TabConfig {
    tabName: string,
    value: MasterData
}

export interface RoleFunction {
    id?: number,
    functionId?: number,
    roleId?: number,
    name?: string,
    create?: boolean,
    read?: boolean,
    update?: boolean,
    delete?: boolean
}
export interface UserAccess{
    userId: number;
    companyIds: number[];
    genderIds: number[];
    brandtypeIds: number[];
    categoryIds: number[];
    subcategoryIds: number[];
    agIds: number[];
    brandnameIds: number[];
}

export interface FieldsValue {
    id: number | string;
    name: number[]
}
