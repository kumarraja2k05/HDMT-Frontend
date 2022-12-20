import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDriveListComponent } from './view-drive-list.component';

describe('ViewDriveListComponent', () => {
  let component: ViewDriveListComponent;
  let fixture: ComponentFixture<ViewDriveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDriveListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDriveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
