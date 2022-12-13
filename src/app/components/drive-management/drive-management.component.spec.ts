import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveManagementComponent } from './drive-management.component';

describe('DriveManagementComponent', () => {
  let component: DriveManagementComponent;
  let fixture: ComponentFixture<DriveManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
