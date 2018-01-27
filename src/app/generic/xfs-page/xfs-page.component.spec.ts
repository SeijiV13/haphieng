import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XfsPageComponent } from './xfs-page.component';

describe('XfsPageComponent', () => {
  let component: XfsPageComponent;
  let fixture: ComponentFixture<XfsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XfsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XfsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
