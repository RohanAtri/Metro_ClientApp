import { TableColumnSettings } from './../../../shared/shared.model';
import { UserColumnKeys, CellTemplateTypes } from './../constants/master.enum';
import { BaseTableSettingsServices } from 'src/app/shared/services/baseTableSettingsService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseTableSettingsServices {

  protected getOrderedColumnKeys(): string[] {
    let columnKeys = [
      UserColumnKeys.ROLENAME,
      UserColumnKeys.USERNAME,
      UserColumnKeys.NAME,
      UserColumnKeys.PASSWORD,
      UserColumnKeys.EMAIL,
      UserColumnKeys.MOBILE,
      UserColumnKeys.STATUS,
      UserColumnKeys.ACTION,
    ];

    return columnKeys;
  }

  protected getColumnSettings(): TableColumnSettings[] {
    let columnSettings = [
      {
        id: UserColumnKeys.ROWNUMBER,
        title: "ID",
        templateName: CellTemplateTypes.RowNumber,
        width: "30px",

      } as TableColumnSettings,
      {
        id: UserColumnKeys.ROLENAME,
        title: "Role Name",
        dataPropName: UserColumnKeys.ROLENAME,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: UserColumnKeys.USERNAME,
        title: "User Name",
        dataPropName: UserColumnKeys.USERNAME,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: UserColumnKeys.NAME,
        title: "Name",
        dataPropName: UserColumnKeys.NAME,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: UserColumnKeys.PASSWORD,
        title: "Password",
        dataPropName: UserColumnKeys.PASSWORD,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: UserColumnKeys.EMAIL,
        title: "Email Id",
        dataPropName: UserColumnKeys.EMAIL,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: UserColumnKeys.MOBILE,
        title: "Contact Number",
        dataPropName: UserColumnKeys.MOBILE,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: UserColumnKeys.STATUS,
        title: "Status",
        dataPropName: "isActive",
        templateName: CellTemplateTypes.STATUS,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: UserColumnKeys.ACTION,
        title: "Action",
        templateName: CellTemplateTypes.ACTION,
        action: true,
        width: "30px",
      } as TableColumnSettings,
    ];
    return columnSettings;
  }
}

