import { TestBed } from '@angular/core/testing';

import { LocalNotifiactionService } from './local-notifiaction.service';

describe('LocalNotifiactionService', () => {
  let service: LocalNotifiactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalNotifiactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
