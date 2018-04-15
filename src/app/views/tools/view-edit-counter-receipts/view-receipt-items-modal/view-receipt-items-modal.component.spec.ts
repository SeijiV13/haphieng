import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceiptItemsModalComponent } from './view-receipt-items-modal.component';

describe('ViewReceiptItemsModalComponent', () => {
  let component: ViewReceiptItemsModalComponent;
  let fixture: ComponentFixture<ViewReceiptItemsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceiptItemsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceiptItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
