import { Injectable } from '@angular/core';
import { MessageConfig } from '../../generic/message.config';

@Injectable()
export class TransactionTitlesService {

  constructor(private config: MessageConfig) { }

  getTitle(title: string): string {
    return this.config.getTitleMessage(title);
  }
}
