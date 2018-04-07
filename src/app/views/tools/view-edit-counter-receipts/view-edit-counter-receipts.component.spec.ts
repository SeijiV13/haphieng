import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditCounterReceiptsComponent } from './view-edit-counter-receipts.component';

describe('ViewEditCounterReceiptsComponent', () => {
  let component: ViewEditCounterReceiptsComponent;
  let fixture: ComponentFixture<ViewEditCounterReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditCounterReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditCounterReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
