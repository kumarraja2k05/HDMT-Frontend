import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelistFormComponent } from './panelist-form.component';

describe('PanelistFormComponent', () => {
  let component: PanelistFormComponent;
  let fixture: ComponentFixture<PanelistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelistFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
