import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitQuotaOptionsComponent } from './limit-quota-options.component';

describe('LimitQuotaOptionsComponent', () => {
  let component: LimitQuotaOptionsComponent;
  let fixture: ComponentFixture<LimitQuotaOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitQuotaOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitQuotaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
