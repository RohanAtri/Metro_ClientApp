import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOptionsComponent } from './d-options.component';

describe('DOptionsComponent', () => {
  let component: DOptionsComponent;
  let fixture: ComponentFixture<DOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
