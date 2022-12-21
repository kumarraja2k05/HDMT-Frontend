import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdminFormComponent } from './show-admin-form.component';

describe('ShowAdminFormComponent', () => {
  let component: ShowAdminFormComponent;
  let fixture: ComponentFixture<ShowAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAdminFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
