import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceUploadsComponent } from './reference-uploads.component';

describe('ReferenceUploadsComponent', () => {
  let component: ReferenceUploadsComponent;
  let fixture: ComponentFixture<ReferenceUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceUploadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
