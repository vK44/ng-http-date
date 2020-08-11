import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NgHttpDateConfiguration} from './ng-http-date.configuration';
import {NgHttpDateConverter} from './ng-http-date.converter';

@Injectable({
  providedIn: 'root'
})
export class NgHttpDateInterceptor implements HttpInterceptor {

  private ISO8601_REGEX: RegExp = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
  private converter: NgHttpDateConverter<any>;

  constructor(private configuration: NgHttpDateConfiguration, @Inject(NgHttpDateConverter) converters: NgHttpDateConverter<any>[]) {
    const sortedConverters = converters.sort((c1, c2) => c1.getOrder() - c2.getOrder());
    const highestPriority = converters[0].getOrder();
    const convertersWithHighestPriority = sortedConverters.filter(c => c.getOrder() === highestPriority);
    if (convertersWithHighestPriority.length > 1) {
      throw new Error('Multiple converters found: ' + convertersWithHighestPriority.map(c => c.getName()));
    }
    this.converter = convertersWithHighestPriority[0];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(event => this.handleEvent(event))
      );
  }

  private handleEvent(response: HttpEvent<any>): void {
    if (response instanceof HttpResponse) {
      this.testAndConvert(response.body);
    }
  }

  private testAndConvert(bodyOrValue: unknown): void {
    if (bodyOrValue && typeof bodyOrValue === 'object') {
      const keys = Object.keys(bodyOrValue);
      let i = keys.length;
      while (i--) {
        const key = keys[i];
        const value = bodyOrValue[key];
        const converted = this.convertToDate(value);
        if (converted) {
          bodyOrValue[key] = converted;
        } else {
          this.testAndConvert(value);
        }
      }
    }
  }

  private convertToDate(something: unknown): any {
    if (typeof something !== 'string') {
      return null;
    }
    if (this.configuration.customRegex) {
      return this.convertWithCustomRegex(something);
    }
    if (this.configuration.useIso8601Only) {
      return this.convertIso8601(something);
    }
    return this.converter.convert(something);
  }

  private convertWithCustomRegex(dateString: string): any {
    if (this.configuration.customRegex.test(dateString)) {
      return this.converter.convert(dateString);
    }
    return null;
  }

  private convertIso8601(dateString: string): any {
    const regex = this.converter.getRegex() || this.ISO8601_REGEX;
    if (dateString.length < 30 && regex.test(dateString)) {
      return this.converter.convert(dateString);
    }
    return null;
  }
}
