import { TestBed } from '@angular/core/testing';

import { AuthPanelistGuard } from './auth-panelist.guard';

describe('AuthPanelistGuard', () => {
  let guard: AuthPanelistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPanelistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
