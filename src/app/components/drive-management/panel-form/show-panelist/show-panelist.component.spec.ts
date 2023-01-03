import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPanelistComponent } from './show-panelist.component';

describe('ShowPanelistComponent', () => {
  let component: ShowPanelistComponent;
  let fixture: ComponentFixture<ShowPanelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPanelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPanelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
