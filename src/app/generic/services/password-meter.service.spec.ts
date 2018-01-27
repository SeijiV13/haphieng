/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PasswordMeterService } from './password-meter.service';

describe('Service: PasswordMeter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordMeterService]
    });
  });

  it('should ...', inject([PasswordMeterService], (service: PasswordMeterService) => {
    expect(service).toBeTruthy();
  }));
});
