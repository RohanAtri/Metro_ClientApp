import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaOptionsComponent } from './da-options.component';

describe('DOptionsComponent', () => {
  let component: DaOptionsComponent;
  let fixture: ComponentFixture<DaOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
