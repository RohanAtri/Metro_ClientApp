import { ColumnBuilderService } from './column-builder.service';
import { TableColumnSettings } from './../shared.model';

export abstract class BaseTableSettingsServices {
    private columnBuilderService = new ColumnBuilderService()

    private columnSettings: TableColumnSettings[];
    // private columnBuilderService = new ColumnBuilderService(); 

    protected abstract getOrderedColumnKeys(): string[];
    protected abstract getColumnSettings(): TableColumnSettings[];

    public setTableSettings(): void {
        this.columnSettings = this.columnBuilderService.createColumns(
            this.getOrderedColumnKeys(),
            this.getColumnSettings(),
        );
    }

    public getTableColumnSettings(): any[] {
        return this.columnSettings;
    }


}