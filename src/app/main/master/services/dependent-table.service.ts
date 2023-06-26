import { Injectable } from '@angular/core';
import { BaseTableSettingsServices } from 'src/app/shared/services/baseTableSettingsService';
import { TableColumnSettings } from './../../../shared/shared.model';
import { CellTemplateTypes, MasterTableColumnKeys, parentName } from './../constants/master.enum';

@Injectable({
  providedIn: 'root'
})
export class DependentTableService extends BaseTableSettingsServices {


  protected getOrderedColumnKeys(): string[] {
    let columnKeys = [
      MasterTableColumnKeys.RowNumber,
      MasterTableColumnKeys.Name,
      MasterTableColumnKeys.SNAME,
      MasterTableColumnKeys.PARENT_NAME,
      MasterTableColumnKeys.Status,
      MasterTableColumnKeys.ACTION,
    ];

    return columnKeys;
  }
  protected getColumnSettings(): TableColumnSettings[] {
    let columnSettings = [
      {
        id: MasterTableColumnKeys.RowNumber,
        title: "ID NO",
        templateName: CellTemplateTypes.RowNumber,
        width: "30px",

      } as TableColumnSettings,
      {
        id: MasterTableColumnKeys.Name,
        title: "Name",
        dataPropName: "name",
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: MasterTableColumnKeys.SNAME,
        title: "SName",
        dataPropName: "sName",
        templateName: CellTemplateTypes.Number,
        width: "30px",
      } as TableColumnSettings,
      {
        id: MasterTableColumnKeys.PARENT_NAME,
        title: parentName.name,
        dataPropName: MasterTableColumnKeys.PARENT_NAME,
        templateName: CellTemplateTypes.Number,
        width: "30px",
      } as TableColumnSettings,
      {
        id: MasterTableColumnKeys.Status,
        title: "Status",
        dataPropName: "isActive",
        templateName: CellTemplateTypes.STATUS,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: MasterTableColumnKeys.ACTION,
        title: "Action",
        templateName: CellTemplateTypes.ACTION,
        action: true,
        width: "30px",
      } as TableColumnSettings,
    ];
    return columnSettings;
  }
}
