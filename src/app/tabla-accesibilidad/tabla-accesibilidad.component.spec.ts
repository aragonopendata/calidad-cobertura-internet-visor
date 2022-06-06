import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAccesibilidadComponent } from './tabla-accesibilidad.component';

describe('VisorComponent', () => {
  let component: TablaAccesibilidadComponent;
  let fixture: ComponentFixture<TablaAccesibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAccesibilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAccesibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
