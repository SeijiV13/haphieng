import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvQuantityAdjustmentsEntriesComponent } from './inv-quantity-adjustments-entries.component';

describe('InvQuantityAdjustmentsEntriesComponent', () => {
  let component: InvQuantityAdjustmentsEntriesComponent;
  let fixture: ComponentFixture<InvQuantityAdjustmentsEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvQuantityAdjustmentsEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvQuantityAdjustmentsEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
