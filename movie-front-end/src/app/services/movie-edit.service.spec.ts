import { TestBed } from '@angular/core/testing';

import { MovieEditService } from './movie-edit.service';

describe('MovieEditService', () => {
  let service: MovieEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
