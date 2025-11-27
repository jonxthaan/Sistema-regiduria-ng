import { TestBed } from '@angular/core/testing';

import { Escuela } from './escuela';

describe('Escuela', () => {
  let service: Escuela;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Escuela);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
