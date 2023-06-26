import { CellTemplateTypes } from './../constants/master.enum';
import { TableColumnSettings } from './../../../shared/shared.model';
import { BaseTableSettingsServices } from 'src/app/shared/services/baseTableSettingsService';
import { Injectable } from '@angular/core';
import { ManagerTableSchema } from '../constants/master.enum';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends BaseTableSettingsServices {

  protected getOrderedColumnKeys(): string[] {
    let columnKeys = [
      ManagerTableSchema.ROWNUMBER,
      ManagerTableSchema.Name,
      // ManagerTableSchema.SNAME,
      ManagerTableSchema.CONTACT_NUMBER,
      ManagerTableSchema.EMAILID,
      ManagerTableSchema.MANAGER_TYPE,
      ManagerTableSchema.STATUS,
      ManagerTableSchema.ACTION,
    ];

    return columnKeys;
  }

  protected getColumnSettings(): TableColumnSettings[] {
    let columnSettings = [
      {
        id: ManagerTableSchema.ROWNUMBER,
        title: "ID NO",
        templateName: CellTemplateTypes.RowNumber,
        width: "30px",

      } as TableColumnSettings,
      {
        id: ManagerTableSchema.Name,
        title: "Name",
        dataPropName: ManagerTableSchema.Name,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      // {
      //   id: ManagerTableSchema.SNAME,
      //   title: "SName",
      //   dataPropName: ManagerTableSchema.SNAME,
      //   templateName: CellTemplateTypes.Text,
      //   width: "30px",
      // } as TableColumnSettings,
      {
        id: ManagerTableSchema.CONTACT_NUMBER,
        title: "Contact No.",
        dataPropName: ManagerTableSchema.CONTACT_NUMBER,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ManagerTableSchema.EMAILID,
        title: "Emailid",
        dataPropName: ManagerTableSchema.EMAILID,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ManagerTableSchema.MANAGER_TYPE,
        title: "Manager Type",
        dataPropName: ManagerTableSchema.MANAGER_TYPE,
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ManagerTableSchema.STATUS,
        title: "Status",
        dataPropName: "isActive",
        templateName: CellTemplateTypes.STATUS,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ManagerTableSchema.ACTION,
        title: "Action",
        templateName: CellTemplateTypes.ACTION,
        action: true,
        width: "30px",
      } as TableColumnSettings,
    ];
    return columnSettings;
  }
}
