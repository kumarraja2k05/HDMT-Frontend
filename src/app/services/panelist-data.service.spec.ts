import { TestBed } from '@angular/core/testing';

import { PanelistDataService } from './panelist-data.service';

describe('PanelistDataService', () => {
  let service: PanelistDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelistDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
