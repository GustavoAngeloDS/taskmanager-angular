import { TestBed } from '@angular/core/testing';

import { BoardManagementService } from './board-management.service';

describe('BoardManagementService', () => {
  let service: BoardManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
