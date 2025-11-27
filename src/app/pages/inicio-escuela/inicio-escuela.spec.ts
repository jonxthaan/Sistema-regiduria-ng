import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEscuela } from './inicio-escuela';

describe('InicioEscuela', () => {
  let component: InicioEscuela;
  let fixture: ComponentFixture<InicioEscuela>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioEscuela]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioEscuela);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
