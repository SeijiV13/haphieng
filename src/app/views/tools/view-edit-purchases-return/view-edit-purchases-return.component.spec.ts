import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditPurchasesReturnComponent } from './view-edit-purchases-return.component';

describe('ViewEditPurchasesReturnComponent', () => {
  let component: ViewEditPurchasesReturnComponent;
  let fixture: ComponentFixture<ViewEditPurchasesReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditPurchasesReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditPurchasesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
