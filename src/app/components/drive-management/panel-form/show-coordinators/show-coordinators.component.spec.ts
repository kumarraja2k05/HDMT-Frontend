import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoordinatorsComponent } from './show-coordinators.component';

describe('ShowCoordinatorsComponent', () => {
  let component: ShowCoordinatorsComponent;
  let fixture: ComponentFixture<ShowCoordinatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCoordinatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCoordinatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
