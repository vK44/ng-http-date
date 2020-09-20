import {Injectable} from '@angular/core';

@Injectable()
export abstract class NgHttpDateConfiguration {

  iso8601Only?: boolean;

  customRegex?: RegExp;

  debug?: boolean;
}

export class DefaultNgHttpDateConfiguration extends NgHttpDateConfiguration {
  iso8601Only = true;
  debug = false;
}
