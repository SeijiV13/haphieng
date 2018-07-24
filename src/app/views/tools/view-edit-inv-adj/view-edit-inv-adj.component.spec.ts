import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditInvAdjComponent } from './view-edit-inv-adj.component';

describe('ViewEditInvAdjComponent', () => {
  let component: ViewEditInvAdjComponent;
  let fixture: ComponentFixture<ViewEditInvAdjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditInvAdjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditInvAdjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
