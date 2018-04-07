import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditInvDamageComponent } from './view-edit-inv-damage.component';

describe('ViewEditInvDamageComponent', () => {
  let component: ViewEditInvDamageComponent;
  let fixture: ComponentFixture<ViewEditInvDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditInvDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditInvDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
