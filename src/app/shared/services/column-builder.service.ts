import { TableColumnSettings } from "../shared.model";

export class ColumnBuilderService {
    public createColumns(orderedColumnKeys: string[], allColumnSettings: TableColumnSettings[]): TableColumnSettings[] {
        let columnSettingMap = this.createColumnSettingsMap(allColumnSettings);
        let columns = this.createTableColumns(orderedColumnKeys, columnSettingMap);
        return columns
    }

    private createColumnSettingsMap(columnSettings: TableColumnSettings[]): Map<string, TableColumnSettings> {
        let map = new Map<string, TableColumnSettings>();
        columnSettings.forEach((columnSettings: TableColumnSettings) => {
            let key = columnSettings.id;

            if (!map.has(key)) {
                map.set(key, columnSettings)
            } else {
                throw new Error('TableColumn settings already has a key, Key Name :-' + key)
            }
        });
        return map;
    }

    private createTableColumns(orderedColumnKeys: string[], columnMap: Map<string, TableColumnSettings>): TableColumnSettings[] {
        let columns:any[]=[];
        orderedColumnKeys.forEach((key: string) => {
            if (!columnMap.has(key)) {
                throw `cannot create key ${key}`;
            }
            columns.push(columnMap.get(key));
        });
        return columns
    }
}