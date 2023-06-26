export enum MasterTableColumnKeys {
  RowNumber = "rowNumber",
  Id = "id",
  Name = "name",
  SNAME = "sname",
  PARENT_NAME = "parentName",
  Status = "Status",
  ACTION = "action"
}

export enum ProductTableColumnKeys {
  ROWNUMBER = "rowNumber",
  Name = "name",
  SNAME = "sName",
  COMPANY = "companyName",
  GENDER = "genderName",
  CATEGORY = "categoryName",
  SUB_CATEGORY = "subcategoryName",
  AG = "agIdName",
  BRAND_TYPE = "brandTypeName",
  BRAND_NAME = "brandNameName",
  STATUS = "status",
  ACTION = "action"
}

export enum UserColumnKeys {
  ROWNUMBER = "rowNumber",
  ROLENAME = 'roleName',
  USERNAME = 'userName',
  NAME = 'name',
  PASSWORD = 'password',
  EMAIL = 'email',
  MOBILE = 'mobile',
  STATUS = "status",
  ACTION = "action"
}

export enum ShowroomTableColumnKeys {
  ROWNUMBER = "rowNumber",
  ACNM = "acnm",
  ACNAME = "acname",
  CITY_MANAGER = "cityManagerName",
  REGIONAL_MANAGER = "regionalManagerName",
  LOC1 = "loc1",
  ETP_ACNM = "etpAcnm",
  BRAND_IDNO = "brandNameName",
  STATE = "stateName",
  CITY = "cityName",
  ZONE = "zone",
  SHRM_TYPE = "shrmTypeName",
  STATUS = "status",
  ACTION = "action"
}

export enum ManagerTableSchema {
  ROWNUMBER = "rowNumber",
  Name = "name",
  SNAME = "sname",
  CONTACT_NUMBER = "contactNo",
  EMAILID = "emailId",
  MANAGER_TYPE = "managerTypeName",
  STATUS = "status",
  ACTION = "action"
}

export enum CellTemplateTypes {
  RowNumber = "rowNumberTemplate",
  Text = "textTemplate",
  Number = "numberTemplate",
  STATUS = 'status',
  ACTION = 'action'
}

export enum MasterComponentName {
  SHOWROOM = 1,
  PRODUCT,
  COMPANY,
  CATEGORY,
  CATEGORYTWO,
  AG,
  BRANDNAME,
  GENDER,
  BRANDTYPE,
  ROLE
}

 class ParentName {
  name: string;
}

export const parentName = new ParentName();
