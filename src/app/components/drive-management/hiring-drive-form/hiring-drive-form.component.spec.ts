import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringDriveFormComponent } from './hiring-drive-form.component';

describe('HiringDriveFormComponent', () => {
  let component: HiringDriveFormComponent;
  let fixture: ComponentFixture<HiringDriveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringDriveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiringDriveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
