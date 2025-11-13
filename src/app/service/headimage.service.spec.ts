import { TestBed } from '@angular/core/testing';

import { HeadimageService } from './headimage.service';

describe('HeadimageService', () => {
  let service: HeadimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
