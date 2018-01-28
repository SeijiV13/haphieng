import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFileComponent } from './agent-file.component';

describe('AgentFileComponent', () => {
  let component: AgentFileComponent;
  let fixture: ComponentFixture<AgentFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
