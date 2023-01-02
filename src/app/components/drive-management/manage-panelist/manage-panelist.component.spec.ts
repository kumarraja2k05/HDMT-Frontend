import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePanelistComponent } from './manage-panelist.component';

describe('ManagePanelistComponent', () => {
  let component: ManagePanelistComponent;
  let fixture: ComponentFixture<ManagePanelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePanelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePanelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
