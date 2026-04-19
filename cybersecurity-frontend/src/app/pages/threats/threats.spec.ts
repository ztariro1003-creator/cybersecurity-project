import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Threats } from './threats';

describe('Threats', () => {
  let component: Threats;
  let fixture: ComponentFixture<Threats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Threats],
    }).compileComponents();

    fixture = TestBed.createComponent(Threats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
