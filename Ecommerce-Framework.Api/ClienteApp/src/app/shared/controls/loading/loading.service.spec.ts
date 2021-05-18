import { inject, TestBed } from '@angular/core/testing';
import { NgbLoadingService } from './loading.service';

describe('LoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbLoadingService]
    });
  });

  it('should be created', inject([NgbLoadingService], (service: NgbLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
