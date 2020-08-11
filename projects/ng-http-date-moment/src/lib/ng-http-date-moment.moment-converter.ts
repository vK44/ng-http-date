import {NgHttpDateConverter} from 'ng-http-date-core';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class NgHttpDateMomentMomentConverter extends NgHttpDateConverter<moment.Moment> {

  convert(dateString: string): moment.Moment {
    const maybeMoment = moment(dateString);
    if (maybeMoment.isValid()) {
      return maybeMoment;
    }
    return null;
  }

  getOrder(): number {
    return 0;
  }

  getName(): string {
    return 'MomentConverter';
  }
}
