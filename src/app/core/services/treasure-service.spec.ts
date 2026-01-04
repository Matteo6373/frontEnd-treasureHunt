import { TestBed } from '@angular/core/testing';

import { TreasureHuntService } from './treasure-hunt.service';

describe('TreasureService', () => {
  let service: TreasureHuntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasureHuntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
