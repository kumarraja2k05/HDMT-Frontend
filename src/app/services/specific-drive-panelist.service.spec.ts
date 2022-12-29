import { TestBed } from '@angular/core/testing';

import { SpecificDrivePanelistService } from './specific-drive-panelist.service';

describe('SpecificDrivePanelistService', () => {
  let service: SpecificDrivePanelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificDrivePanelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
