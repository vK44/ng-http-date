import dayjs, {Dayjs} from 'dayjs';
import {NgHttpDateConverter} from 'ng-http-date-core';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class NgHttpDateDayjsDayjsConverter extends NgHttpDateConverter<Dayjs> {

  convert(dateString: string): Dayjs {
    const maybeDay = dayjs(dateString);
    if (maybeDay.isValid()) {
      return maybeDay;
    }
    return null;
  }

  getOrder(): number {
    return 0;
  }

  getName(): string {
    return 'DayjsConverter';
  }
}
