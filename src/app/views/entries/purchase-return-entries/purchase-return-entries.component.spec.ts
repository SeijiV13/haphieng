import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnEntriesComponent } from './purchase-return-entries.component';

describe('PurchaseReturnEntriesComponent', () => {
  let component: PurchaseReturnEntriesComponent;
  let fixture: ComponentFixture<PurchaseReturnEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReturnEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
