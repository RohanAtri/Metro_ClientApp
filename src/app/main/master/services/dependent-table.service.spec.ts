import { TestBed } from '@angular/core/testing';

import { DependentTableService } from './dependent-table.service';

describe('DependentTableService', () => {
  let service: DependentTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependentTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
