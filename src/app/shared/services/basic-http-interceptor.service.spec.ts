import { TestBed } from '@angular/core/testing';

import { BasicHttpInterceptorService } from './basic-http-interceptor.service';

describe('BasicHttpInterceptorService', () => {
  let service: BasicHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
