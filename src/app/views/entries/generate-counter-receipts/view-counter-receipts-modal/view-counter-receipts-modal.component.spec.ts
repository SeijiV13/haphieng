import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCounterReceiptsModalComponent } from './view-counter-receipts-modal.component';

describe('ViewCounterReceiptsModalComponent', () => {
  let component: ViewCounterReceiptsModalComponent;
  let fixture: ComponentFixture<ViewCounterReceiptsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCounterReceiptsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCounterReceiptsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
