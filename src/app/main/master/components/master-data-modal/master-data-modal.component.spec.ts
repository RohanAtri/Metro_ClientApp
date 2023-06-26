import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataModalComponent } from './master-data-modal.component';

describe('MasterDataModalComponent', () => {
  let component: MasterDataModalComponent;
  let fixture: ComponentFixture<MasterDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDataModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
