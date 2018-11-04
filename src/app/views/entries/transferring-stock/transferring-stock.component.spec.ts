import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferringStockComponent } from './transferring-stock.component';

describe('TransferringStockComponent', () => {
  let component: TransferringStockComponent;
  let fixture: ComponentFixture<TransferringStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferringStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferringStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
