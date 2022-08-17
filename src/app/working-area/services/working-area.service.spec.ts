import { TestBed } from '@angular/core/testing';

import { WorkingAreaService } from './working-area.service';

describe('WorkingAreaService', () => {
  let service: WorkingAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
