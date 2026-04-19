import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsComponent } from './incidents';

describe('Incidents', () => {
  let component: IncidentsComponent;
  let fixture: ComponentFixture<IncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
