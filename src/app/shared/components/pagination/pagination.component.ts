import { PaginationOptions } from './../../shared.model';
import { sharedConstants } from 'src/app/shared/constants/constants';
import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FILTER_PAG_REGEX } from './../../constants/shared.enums';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input() totalRecords: number;
  @Input() recordPerPage: number;
  @Input() updateCurrentPageNumber: number;

  @Output() currentPageNumber: EventEmitter<PaginationOptions> = new EventEmitter<PaginationOptions>();

  currentPage = 1;
  selectedPageSize: number = sharedConstants.pageSizeOption[0];
  pageNumberOptions: number[] = sharedConstants.pageSizeOption;
  paginationOptions: PaginationOptions;
  preservedPageNumber: number = 1;
  totalPageNumbers: number;

  constructor() { }

  ngOnInit() {
    this.selectedPageSize=this.recordPerPage?this.recordPerPage:sharedConstants.pageSizeOption[0];
  }

  ngOnChanges() {
    this.totalPageNumbers = Math.ceil(this.totalRecords / this.selectedPageSize)
    if (this.updateCurrentPageNumber) {
      this.currentPage = this.updateCurrentPageNumber;
    }
  }

  selectPage(currentPage: any) {
    const currentPageNumber: any = Math.ceil(currentPage);
    if (+currentPageNumber >= 1 && +currentPageNumber <= this.totalPageNumbers) {
      this.currentPage = parseInt(currentPageNumber, 10) || 1;
      this.paginationOptions = {
        currentPage: this.currentPage,
        recordPerPage: this.selectedPageSize
      }
      this.currentPageNumber.emit(this.paginationOptions);
      this.preservedPageNumber = +currentPageNumber;
    } else {
      this.currentPage = this.preservedPageNumber;
    }
  }

  changeRecordsByNoOfRecords(selectedPageSize: number) {
    this.currentPage = 1;
    this.selectedPageSize = selectedPageSize;
    this.paginationOptions = {
      currentPage: this.currentPage,
      recordPerPage: this.selectedPageSize
    }
    this.currentPageNumber.emit(this.paginationOptions)
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}
