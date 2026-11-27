import { TestBed } from '@angular/core/testing';
import { Kitsune } from './kitsune';

describe('Kitsune', () => {
  let service: Kitsune;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kitsune);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
