import { TestBed } from '@angular/core/testing';

import { SpecificEntityService } from './specific-entity.service';

describe('SpecificEntityService', () => {
  let service: SpecificEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
