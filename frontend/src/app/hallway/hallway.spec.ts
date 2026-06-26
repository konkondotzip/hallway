import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hallway } from './hallway';

describe('Gaming', () => {
  let component: Hallway;
  let fixture: ComponentFixture<Hallway>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hallway],
    }).compileComponents();

    fixture = TestBed.createComponent(Hallway);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
