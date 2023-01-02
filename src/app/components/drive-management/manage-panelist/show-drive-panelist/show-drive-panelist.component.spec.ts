import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDrivePanelistComponent } from './show-drive-panelist.component';

describe('ShowDrivePanelistComponent', () => {
  let component: ShowDrivePanelistComponent;
  let fixture: ComponentFixture<ShowDrivePanelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDrivePanelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDrivePanelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
