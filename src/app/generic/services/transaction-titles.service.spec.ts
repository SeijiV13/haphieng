/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransactionTitlesService } from './transaction-titles.service';

describe('Service: TransactionTitles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionTitlesService]
    });
  });

  it('should ...', inject([TransactionTitlesService], (service: TransactionTitlesService) => {
    expect(service).toBeTruthy();
  }));
});
