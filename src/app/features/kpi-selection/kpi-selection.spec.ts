import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSelection } from './kpi-selection';

describe('KpiSelection', () => {
  let component: KpiSelection;
  let fixture: ComponentFixture<KpiSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
