import * as dayjs from 'dayjs';
import {NgHttpDateConverter} from 'ng-http-date-core';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class NgHttpDateDayjsDayjsConverter extends NgHttpDateConverter<dayjs.Dayjs> {

  convert(dateString: string): dayjs.Dayjs {
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
