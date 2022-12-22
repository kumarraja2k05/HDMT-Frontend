import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringDriveInfoComponent } from './hiring-drive-info.component';

describe('HiringDriveInfoComponent', () => {
  let component: HiringDriveInfoComponent;
  let fixture: ComponentFixture<HiringDriveInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringDriveInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiringDriveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
