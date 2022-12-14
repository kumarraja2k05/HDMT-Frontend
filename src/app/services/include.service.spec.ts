import { TestBed } from '@angular/core/testing';

import { IncludeService } from './include.service';

describe('IncludeService', () => {
  let service: IncludeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncludeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
