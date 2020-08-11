import {NgHttpDateConverter} from './ng-http-date.converter';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgHttpDateDateConverter extends NgHttpDateConverter<Date> {

  private REGEX: RegExp = /^(\d{4}(?!\d{2}\b))(-((0[1-9]|1[0-2])(-([12]\d|0[1-9]|3[01]))?)([T\s]((([01]\d|2[0-3])(:[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(:[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

  getRegex(): RegExp {
    return this.REGEX;
  }

  convert(dateString: string): Date {
    const maybeDate: Date = new Date(dateString);
    // tslint:disable-next-line:triple-equals
    if (maybeDate as unknown != 'Invalid Date') {
      return maybeDate;
    }
    return null;
  }

  getOrder(): number {
    return 100;
  }

  getName(): string {
    return 'DateConverter';
  }


}
