import {NgHttpDateConverter} from 'ng-http-date-core';
import {Injectable} from '@angular/core';
import moment, {Moment} from 'moment';

@Injectable({providedIn: 'root'})
export class NgHttpDateMomentMomentConverter extends NgHttpDateConverter<Moment> {

  convert(dateString: string): Moment {
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
