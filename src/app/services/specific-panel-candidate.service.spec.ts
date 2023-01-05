import { TestBed } from '@angular/core/testing';

import { SpecificPanelCandidateService } from './specific-panel-candidate.service';

describe('SpecificPanelCandidateService', () => {
  let service: SpecificPanelCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificPanelCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
