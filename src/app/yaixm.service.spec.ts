import { TestBed } from '@angular/core/testing';

import { YaixmService } from './yaixm.service';

describe('YaixmService', () => {
  let service: YaixmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YaixmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
