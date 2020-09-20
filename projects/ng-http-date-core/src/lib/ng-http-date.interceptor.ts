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

  private converter: NgHttpDateConverter<any>;

  constructor(private configuration: NgHttpDateConfiguration, @Inject(NgHttpDateConverter) converters: NgHttpDateConverter<any>[]) {
    this.logIfDebugIsEnabled('configuration = ', () => configuration);
    const sortedConverters = converters.sort((c1, c2) => c1.getOrder() - c2.getOrder());
    this.logIfDebugIsEnabled('converters found: ', () => sortedConverters.map(c => c.getName() + ', order: ' + c.getOrder()));
    const highestPriority = converters[0].getOrder();
    this.logIfDebugIsEnabled('highestPriority: ', () => highestPriority);
    const convertersWithHighestPriority = sortedConverters.filter(c => c.getOrder() === highestPriority);
    this.logIfDebugIsEnabled(
      'convertersWithHighestPriority: ',
      () => convertersWithHighestPriority.map(c => c.getName() + ', order: ' + c.getOrder())
    );
    if (convertersWithHighestPriority.length > 1) {
      throw new Error('Multiple converters found: ' + convertersWithHighestPriority.map(c => c.getName()));
    }
    this.converter = convertersWithHighestPriority[0];
    this.logIfDebugIsEnabled('converter is set to: ', () => this.converter.getName());
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(event => this.handleEvent(event))
      );
  }

  private handleEvent(response: HttpEvent<any>): void {
    if (response instanceof HttpResponse) {
      this.logIfDebugIsEnabled('test and convert response: ', () => response);
      this.testAndConvert(response);
    } else {
      this.logIfDebugIsEnabled('response is not converted because it is not an instance of HttpResponse: ', () => response);
    }
  }

  private testAndConvert(response: HttpResponse<any>): void {
    switch (typeof response.body) {
      case 'object':
        this.logIfDebugIsEnabled('test an convert object response body: ', () => response.body);
        this.testAndConvertObject(response.body);
        break;
      case 'string':
        this.logIfDebugIsEnabled('test an convert string response body: ', () => response.body);
        this.testAndConvertString(response);
        break;
    }
  }

  private testAndConvertObject(something: unknown): void {
    if (something && typeof something === 'object') {
      const keys = Object.keys(something);
      let i = keys.length;
      while (i--) {
        const key = keys[i];
        const value = something[key];
        this.logIfDebugIsEnabled(`testing property ${key} with value`, () => value);
        const converted = this.convertToDate(value);
        if (converted) {
          this.logIfDebugIsEnabled(`converted property ${key} to`, () => converted);
          something[key] = converted;
        } else {
          this.testAndConvertObject(value);
        }
      }
    }
  }

  private testAndConvertString(response: Mutable<HttpResponse<string>>): void {
    const converted = this.convertToDate(response.body);
    if (converted) {
      response.body = converted;
      this.logIfDebugIsEnabled('converted response body to', () => converted);
    }
  }

  private convertToDate(something: unknown): any {
    if (typeof something !== 'string') {
      this.logIfDebugIsEnabled('not converted because it is not a string: ', () => something);
      return null;
    }
    if (this.configuration.customRegex) {
      return this.convertWithCustomRegex(something);
    }
    if (this.configuration.iso8601Only) {
      return this.convertIso8601(something);
    }
    return this.converter.convert(something);
  }

  private convertWithCustomRegex(dateString: string): any {
    this.logIfDebugIsEnabled(`check with customRegex ${this.configuration.customRegex} for string `, () => dateString);
    if (this.configuration.customRegex.test(dateString)) {
      this.logIfDebugIsEnabled(`customRegex ${this.configuration.customRegex} matched string `, () => dateString);
      return this.converter.convert(dateString);
    }
    this.logIfDebugIsEnabled(`customRegex ${this.configuration.customRegex} NOT matched string `, () => dateString);
    return null;
  }

  private convertIso8601(dateString: string): any {
    const regex = this.converter.getRegex();
    this.logIfDebugIsEnabled(`check with regex ${regex} for string `, () => dateString);
    if (dateString.length < 30 && regex.test(dateString)) {
      this.logIfDebugIsEnabled(`regex ${regex} matched string `, () => dateString);
      return this.converter.convert(dateString);
    }
    this.logIfDebugIsEnabled(`regex ${regex} NOT matched string `, () => dateString);
    return null;
  }

  private logIfDebugIsEnabled(message: string, ...args: (() => any)[]): void {
    if (this.configuration.debug) {
      console.log(message, ...(args.map(a => a.apply(this))));
    }
  }
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] };
