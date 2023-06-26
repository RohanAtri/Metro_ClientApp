import { TableColumnSettings } from './../../../shared/shared.model';
import { BaseTableSettingsServices } from 'src/app/shared/services/baseTableSettingsService';
import { ProductTableColumnKeys, CellTemplateTypes } from './../constants/master.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductDataService extends BaseTableSettingsServices {

  protected getOrderedColumnKeys(): string[] {
    let columnKeys = [
      ProductTableColumnKeys.ROWNUMBER,
      ProductTableColumnKeys.Name,
      ProductTableColumnKeys.SNAME,
      ProductTableColumnKeys.COMPANY,
      ProductTableColumnKeys.GENDER,
      ProductTableColumnKeys.CATEGORY,
      ProductTableColumnKeys.SUB_CATEGORY,
      ProductTableColumnKeys.AG,
      ProductTableColumnKeys.BRAND_TYPE,
      ProductTableColumnKeys.BRAND_NAME,
      ProductTableColumnKeys.STATUS,
      ProductTableColumnKeys.ACTION,
    ];

    return columnKeys;
  }

  protected getColumnSettings(): TableColumnSettings[] {
    let columnSettings = [
      {
        id: ProductTableColumnKeys.ROWNUMBER,
        title: "ID NO",
        templateName: CellTemplateTypes.RowNumber,
        width: "30px",

      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.Name,
        title: "Name",
        dataPropName: "name",
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.SNAME,
        title: "SName",
        dataPropName: "sName",
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.COMPANY,
        title: "Company",
        dataPropName: "companyName",
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.GENDER,
        title: "Gender",
        dataPropName: "genderName",
        templateName: CellTemplateTypes.Text,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.CATEGORY,
        title: "Category",
        dataPropName: "categoryName",
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.SUB_CATEGORY,
        title: "Sub Category",
        dataPropName: "subcategoryName",
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.AG,
        title: "AG",
        dataPropName: ProductTableColumnKeys.AG,
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.BRAND_TYPE,
        title: "Brand Type",
        dataPropName: "brandTypeName",
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.BRAND_NAME,
        title: "Brand Name",
        dataPropName: "brandNameName",
        templateName: CellTemplateTypes.Text,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.STATUS,
        title: "Status",
        dataPropName: "isActive",
        templateName: CellTemplateTypes.STATUS,
        status: true,
        width: "30px",
      } as TableColumnSettings,
      {
        id: ProductTableColumnKeys.ACTION,
        title: "Action",
        templateName: CellTemplateTypes.ACTION,
        action: true,
        width: "30px",
      } as TableColumnSettings,
    ];
    return columnSettings;
  }
}
