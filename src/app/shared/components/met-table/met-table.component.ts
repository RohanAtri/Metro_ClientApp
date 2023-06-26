import { MasterData } from './../../../main/master/models/master.model';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { BaseTableSettingsServices } from '../../services/baseTableSettingsService';
import { keyValue } from './../../shared.model';

@Component({
  selector: 'met-table',
  templateUrl: './met-table.component.html',
  styleUrls: ['./met-table.component.scss']
})
export class MetTableComponent implements OnInit {

  @ViewChild('tableHead') tableHead!: ElementRef<HTMLElement>;
  @ViewChild('theadTable') theadTable!: ElementRef<HTMLElement>;

  @Input() tableData: any[];
  @Input() tableName: string;
  @Input() access: any;

  @Input() tableSettings: BaseTableSettingsServices;

  @Output() dataToEdit: EventEmitter<MasterData> = new EventEmitter<MasterData>();
  @Output() dataToDelete: EventEmitter<MasterData> = new EventEmitter<MasterData>();
  @Output() updateStatus: EventEmitter<MasterData> = new EventEmitter<MasterData>();
  @Output() addtionalAction: EventEmitter<MasterData> = new EventEmitter<MasterData>();

  public tableHeaderHeight: any;
  public scrollXPosition: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tableSettings.setTableSettings();
  }

  ngAfterViewInit() {
    // this.tableSettings.setTableSettings();
    setTimeout(() => {
      this.tableHeaderHeight = document.getElementById('theadTable')?.clientHeight;
      this.cd.detectChanges();
    }, 0);
  }

  editData(dataToEdit: MasterData) {
    this.dataToEdit.emit(dataToEdit);
  }

  deleteData(dataToEdit: MasterData) {
    this.dataToDelete.emit(dataToEdit);
  }

  addtionalData(dataToEdit: MasterData) {
    this.addtionalAction.emit(dataToEdit);
  }

  getStatus(status: MasterData) {
    status.isActive = !status.isActive;
    this.updateStatus.emit(status);
  }

  tbodyScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableHead?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
  }

}
