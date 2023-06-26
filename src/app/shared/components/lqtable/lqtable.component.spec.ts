import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LQTableComponent } from './lqtable.component';

describe('LQTableComponent', () => {
  let component: LQTableComponent;
  let fixture: ComponentFixture<LQTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LQTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LQTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
