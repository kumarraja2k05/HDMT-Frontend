import { TestBed } from '@angular/core/testing';

import { SpecifcPanelService } from './specifc-panel.service';

describe('SpecifcPanelService', () => {
  let service: SpecifcPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecifcPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
