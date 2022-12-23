import { TestBed } from '@angular/core/testing';

import { SpecificDriveService } from './specific-drive.service';

describe('SpecificDriveService', () => {
  let service: SpecificDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
