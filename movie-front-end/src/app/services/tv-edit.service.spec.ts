import { TestBed } from '@angular/core/testing';

import { TvEditService } from './tv-edit.service';

describe('TvEditService', () => {
  let service: TvEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
