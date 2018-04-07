import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCounterReceiptsComponent } from './generate-counter-receipts.component';

describe('GenerateCounterReceiptsComponent', () => {
  let component: GenerateCounterReceiptsComponent;
  let fixture: ComponentFixture<GenerateCounterReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCounterReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCounterReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
