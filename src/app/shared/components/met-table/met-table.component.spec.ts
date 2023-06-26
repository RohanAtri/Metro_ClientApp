import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetTableComponent } from './met-table.component';

describe('MetTableComponent', () => {
  let component: MetTableComponent;
  let fixture: ComponentFixture<MetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
