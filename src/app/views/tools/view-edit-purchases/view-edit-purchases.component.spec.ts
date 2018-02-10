import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditPurchasesComponent } from './view-edit-purchases.component';

describe('ViewEditPurchasesComponent', () => {
  let component: ViewEditPurchasesComponent;
  let fixture: ComponentFixture<ViewEditPurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditPurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
