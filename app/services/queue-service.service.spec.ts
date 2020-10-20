import { TestBed } from '@angular/core/testing';

import { QueueServiceService } from './queue-service.service';

describe('QueueServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueueServiceService = TestBed.get(QueueServiceService);
    expect(service).toBeTruthy();
  });
});
