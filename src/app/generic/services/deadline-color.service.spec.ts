/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeadlineColorService } from './deadline-color.service';

describe('Service: DeadlineColor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeadlineColorService]
    });
  });

  it('should ...', inject([DeadlineColorService], (service: DeadlineColorService) => {
    expect(service).toBeTruthy();
  }));
});
