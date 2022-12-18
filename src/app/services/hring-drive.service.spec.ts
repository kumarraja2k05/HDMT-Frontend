import { TestBed } from '@angular/core/testing';

import { HringDriveService } from './hring-drive.service';

describe('HringDriveService', () => {
  let service: HringDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HringDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
