import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroParticipacion } from './registro-participacion';

describe('RegistroParticipacion', () => {
  let component: RegistroParticipacion;
  let fixture: ComponentFixture<RegistroParticipacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroParticipacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroParticipacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
