/* tslint:disable:no-string-literal */
import {NgHttpDateInterceptor} from './ng-http-date.interceptor';
import {NgHttpDateConfiguration} from './ng-http-date.configuration';
import {NgHttpDateDateConverter} from './ng-http-date.date-converter';

describe('NgHttpDateInterceptor', () => {
  let interceptor: NgHttpDateInterceptor;

  beforeEach(() => {
    interceptor = new NgHttpDateInterceptor(new NgHttpDateConfiguration(), [new NgHttpDateDateConverter()]);
  });

  it('#convertToDate should convert (with default config) YYYY strings to Date', () => {
    expect(interceptor['convertToDate']('1988').toISOString()).toBe('1988-01-01T00:00:00.000Z');
  });

  it('#convertToDate should convert (with default config) YYYY-MM strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04').toISOString()).toBe('1988-04-01T00:00:00.000Z');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14').toISOString()).toBe('1988-04-14T00:00:00.000Z');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24').toLocaleString('de-de')).toBe('14.4.1988, 03:24:00');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD hh:mm strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14 03:24').toLocaleString('de-de')).toBe('14.4.1988, 03:24:00');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24:11').toLocaleString('de-de')).toBe('14.4.1988, 03:24:11');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24:11.123').toLocaleString('de-de')).toBe('14.4.1988, 03:24:11');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss\'Z\' strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24:11.123Z').toISOString()).toBe('1988-04-14T03:24:11.123Z');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss-hh:mm strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24:11.123-05:00').toISOString()).toBe('1988-04-14T08:24:11.123Z');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss+hh:mm strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24:11.123+05:30').toISOString()).toBe('1988-04-13T21:54:11.123Z');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss-hhmm strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24:11.123-0500').toISOString()).toBe('1988-04-14T08:24:11.123Z');
  });

  it('#convertToDate should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss+hhmm strings to Date', () => {
    expect(interceptor['convertToDate']('1988-04-14T03:24:11.123+0530').toISOString()).toBe('1988-04-13T21:54:11.123Z');
  });

  it('#convertToDate should not convert (with default config) non-ISO8601 Date-strings to Date', () => {
    expect(interceptor['convertToDate']('December 17, 1995 03:24:00')).toBeNull();
  });

  it('#convertToDate should not convert (with default config) other strings to Date', () => {
    expect(interceptor['convertToDate']('abcdefg')).toBeNull();
  });

  it('#convertToDate should not convert (with default config) numbers to Date', () => {
    expect(interceptor['convertToDate'](123)).toBeNull();
  });

  it('#convertToDate should not convert (with default config) objects to Date', () => {
    expect(interceptor['convertToDate']({})).toBeNull();
  });

  it('#convertToDate should not convert (with default config) objects to Date', () => {
    expect(interceptor['convertToDate']({})).toBeNull();
  });

  it('performanceTest', () => {
    const testObj = {
      someString: 'FooBar',
      someNumber: 23,
      someDateTime: '2020-07-31T16:13:01.931Z',
      innerObject: {
        anotherDate: '2020-07-31',
        nullObj: null
      },
      anotherInner: {
        1: 1,
        2: 'asdasds asd asd asdsad',
        3: '2020-07-31T16:13:01.931T',
        4: {
          1: {
            1: '2020-07-31T16:13:01.931Z',
            2: '202020202020',
            3: 123,
            4: {}
          }
        }
      },
      1: '2004-13-13',
    };
    const start = new Date().getTime();
    for (let i = 0; i < 1_000_000; i++) {
      interceptor['testAndConvert'](Object.assign({}, testObj));
    }
    const time = new Date().getTime() - start;
    console.log('time = ' + time);
    expect(time).toBeGreaterThan(0);
  });
});
