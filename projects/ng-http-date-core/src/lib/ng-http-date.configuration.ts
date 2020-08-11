import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgHttpDateConfiguration {

  useIso8601Only = true;

  customRegex?: RegExp;
}
