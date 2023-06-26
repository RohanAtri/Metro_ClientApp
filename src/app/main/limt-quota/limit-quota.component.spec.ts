import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitQuotaComponent } from './limit-quota.component';

describe('LimitQuotaComponent', () => {
  let component: LimitQuotaComponent;
  let fixture: ComponentFixture<LimitQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitQuotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
