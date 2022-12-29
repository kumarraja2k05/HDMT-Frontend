import { TestBed } from '@angular/core/testing';

import { SpecificCandidateService } from './specific-candidate.service';

describe('SpecificCandidateService', () => {
  let service: SpecificCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
