import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-o-table',
  templateUrl: './o-table.component.html',
  styleUrls: ['./o-table.component.scss']
})
export class OTableComponent implements OnInit {

  @HostBinding('class') class = 'd-flex flex-column h-100 overflow-hidden';

  @ViewChild('tableHead') tableHead!: ElementRef<HTMLElement>;
  @ViewChild('tableBody') tableBody!: ElementRef<HTMLElement>;

  @Input() access: any;
  @Input()
  public set tableData(v: any) {
    if (v && this.headerTotal) {
      this.tableRecords = v;

      setTimeout(() => {
        this.tableHeaderHeight = document.getElementById('theadTable')?.clientHeight;
        this.tableBodyHeight = document.getElementById('tableBody')?.clientHeight;
        this.cd.detectChanges();
      }, 0);
      this.noDataFound = false;
    }

    else {
      this.noDataFound = true;
      this.tableRecords = v;
      this.headerTotal = [];
    }
  }

  noDataFound: boolean;
  scrollXPosition: any;
  headerTotal: any[];
  tableRecords: any;
  tableHeaderHeight: any;
  tableBodyHeight: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(value: any) {
    if (value.currentValue) {
      this.tableHeaderHeight = document.getElementById('theadTable')?.clientHeight;
      this.tableBodyHeight = document.getElementById('tableBody')?.clientHeight;
    }
  }

  tbodyScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableHead?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
  }

  theadScroll(e: any) {
    this.scrollXPosition = e.target.scrollLeft;
    let theadEl: HTMLElement = this.tableBody?.nativeElement;
    theadEl.scroll(this.scrollXPosition, 0);
  }

}
