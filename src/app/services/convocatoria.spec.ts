import { TestBed } from '@angular/core/testing';

import { Convocatoria } from './convocatoria';

describe('Convocatoria', () => {
  let service: Convocatoria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Convocatoria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
