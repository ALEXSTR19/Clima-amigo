import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvRegis } from './inv-regis';

describe('InvRegis', () => {
  let component: InvRegis;
  let fixture: ComponentFixture<InvRegis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvRegis],
    }).compileComponents();

    fixture = TestBed.createComponent(InvRegis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
