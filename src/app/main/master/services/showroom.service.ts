import { CellTemplateTypes } from './../constants/master.enum';
import { TableColumnSettings } from './../../../shared/shared.model';
import { BaseTableSettingsServices } from 'src/app/shared/services/baseTableSettingsService';
import { Injectable } from '@angular/core';
import { ShowroomTableColumnKeys } from '../constants/master.enum';

@Injectable({
  providedIn: 'root'
})
export class ShowroomService extends BaseTableSettingsServices {

  protected getOrderedColumnKeys(): string[] {
    let columnKeys = [
      ShowroomTableColumnKeys.ROWNUMBER,
      ShowroomTableColumnKeys.ACNM,
      ShowroomTableColumnKeys.ACNAME,
      ShowroomTableColumnKeys.CITY_MANAGER,
      ShowroomTableColumnKeys.REGIONAL_MANAGER,
      ShowroomTableColumnKeys.LOC1,
      ShowroomTableColumnKeys.ETP_ACNM,
      ShowroomTableColumnKeys.BRAND_IDNO,
      ShowroomTableColumnKeys.STATE,
      ShowroomTableColumnKeys.CITY,
      ShowroomTableColumnKeys.ZONE,
      ShowroomTableColumnKeys.SHRM_TYPE,
      ShowroomTableColumnKeys.STATUS,
      ShowroomTableColumnKeys.ACTION,
    ];

    return columnKeys;
  }

  protected getColumnSettings(): TableColumnSettings[] {
    let columnSettings = [
      {
        id: ShowroomTableColumnKeys.ROWNUMBER,
        title: "ID NO",
        templateName: CellTemplateTypes.RowNumber,
        width: "30px",

      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.ACNM,
        title: "ACNM",
        dataPropName: "acnm",
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.ACNAME,
        title: "ACNAME",
        dataPropName: "acname",
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.CITY_MANAGER,
        title: "CITY MANAGER",
        dataPropName: ShowroomTableColumnKeys.CITY_MANAGER,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.REGIONAL_MANAGER,
        title: "REGIONAL MANAGER",
        dataPropName: ShowroomTableColumnKeys.REGIONAL_MANAGER,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.LOC1,
        title: "LOC1",
        dataPropName: ShowroomTableColumnKeys.LOC1,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.ETP_ACNM,
        title: "ETP_ACNM",
        dataPropName: "etpAcnm",
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.BRAND_IDNO,
        title: "BRAND_IDNO",
        dataPropName: ShowroomTableColumnKeys.BRAND_IDNO,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.STATE,
        title: "STATE",
        dataPropName: ShowroomTableColumnKeys.STATE,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.CITY,
        title: "CITY",
        dataPropName: ShowroomTableColumnKeys.CITY,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.ZONE,
        title: "ZONE",
        dataPropName:  ShowroomTableColumnKeys.ZONE,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.SHRM_TYPE,
        title: "SHRM_TYPE",
        dataPropName: ShowroomTableColumnKeys.SHRM_TYPE,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.STATUS,
        title: "Status",
        dataPropName: "isActive",
        templateName: CellTemplateTypes.STATUS,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ShowroomTableColumnKeys.ACTION,
        title: "Action",
        templateName: CellTemplateTypes.ACTION,
        action: true,
        width: "30px",
      } as TableColumnSettings,
    ];
    return columnSettings;
  }
}
