import { CellTemplateTypes } from '../constants/master.enum';
import { TableColumnSettings } from '../../../shared/shared.model';
import { Injectable } from '@angular/core';
import { MasterTableColumnKeys } from '../constants/master.enum';
import { BaseTableSettingsServices } from 'src/app/shared/services/baseTableSettingsService';


@Injectable()
export class MasterService extends BaseTableSettingsServices {

  protected getOrderedColumnKeys(): string[] {
    let columnKeys = [
      MasterTableColumnKeys.RowNumber,
      MasterTableColumnKeys.Name,
      MasterTableColumnKeys.SNAME,
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
