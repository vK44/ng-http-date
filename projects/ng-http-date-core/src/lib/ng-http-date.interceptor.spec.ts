/* tslint:disable:no-string-literal */
import {NgHttpDateInterceptor} from './ng-http-date.interceptor';
import {DefaultNgHttpDateConfiguration} from './ng-http-date.configuration';
import {NgHttpDateDateConverter} from './ng-http-date.date-converter';
import {HttpResponse} from '@angular/common/http';

describe('NgHttpDateInterceptor', () => {
  let interceptor: NgHttpDateInterceptor;

  beforeEach(() => {
    interceptor = new NgHttpDateInterceptor({...new DefaultNgHttpDateConfiguration(), ...{debug: true}}, [new NgHttpDateDateConverter()]);
  });

  it('#testAndConvert should convert (with default config) YYYY strings to Date', () => {
    test(interceptor, {testDate: '1988'}, {testDate: new Date('1988')});
  });

  it('#testAndConvert should convert (with default config) YYYY-MM strings to Date', () => {
    test(interceptor, {testDate: '1988-04', other: 12345}, {
      testDate: new Date('1988-04'),
      other: 12345
    });
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD strings to Date', () => {
    test(interceptor, {testDate: '1988-04-14', other: '12345'}, {
      testDate: new Date('1988-04-14'),
      other: '12345'
    });
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm strings to Date', () => {
    test(interceptor, {testDate: '1988-04-14T03:24', other: null}, {
      testDate: new Date('1988-04-14T03:24'),
      other: null
    });
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD hh:mm strings to Date', () => {
    test(interceptor, '1988-04-14 03:24', new Date('1988-04-14 03:24'));
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss strings to Date', () => {
    test(interceptor, '1988-04-14T03:24:11', new Date('1988-04-14T03:24:11'));
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss strings to Date', () => {
    test(interceptor, '1988-04-14T03:24:11.123', new Date('1988-04-14T03:24:11.123'));
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss\'Z\' strings to Date', () => {
    test(
      interceptor,
      {
        testDate: '1988-04-14T03:24:11.123',
        inner: {testDate2: '1988-04-14T03:24:11.123'}
      },
      {testDate: new Date('1988-04-14T03:24:11.123'), inner: {testDate2: new Date('1988-04-14T03:24:11.123')}}
    );
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss-hh:mm strings to Date', () => {
    test(interceptor, '1988-04-14T03:24:11.123-05:00', new Date('1988-04-14T03:24:11.123-05:00'));
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss+hh:mm strings to Date', () => {
    test(interceptor, {testDate: '1988-04-14T03:24:11.123+05:30'}, {testDate: new Date('1988-04-14T03:24:11.123+05:30')});
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss-hhmm strings to Date', () => {
    test(interceptor, {testDate: '1988-04-14T03:24:11.123-0500'}, {testDate: new Date('1988-04-14T08:24:11.123Z')});
  });

  it('#testAndConvert should convert (with default config) YYYY-MM-DD\'T\'hh:mm:ss.sss+hhmm strings to Date', () => {
    test(interceptor, {testDate: '1988-04-14T03:24:11.123+0530'}, {testDate: new Date('1988-04-14T03:24:11.123+0530')});
  });

  it('#testAndConvert should not convert (with default config) non-ISO8601 Date-strings to Date', () => {
    test(interceptor, {testDate: 'December 17, 1995 03:24:00'}, {testDate: 'December 17, 1995 03:24:00'});
  });

  it('#testAndConvert should not convert (with default config) objects to Date', () => {
    test(interceptor, {testDate: {}}, {testDate: {}});
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
    for (let i = 0; i < 10; i++) {
      interceptor['testAndConvert'](convertToResponse(Object.assign({}, testObj)));
    }
    const time = new Date().getTime() - start;
    console.log('time = ' + time);
    expect(time).toBeGreaterThan(0);
  });
});

function test<T>(interceptor: NgHttpDateInterceptor, input: T, expected: object): void {
  const response = convertToResponse<T>(input);
  interceptor['testAndConvert'](response);
  expect(JSON.stringify(response.body)).toBe(JSON.stringify(expected));
}

function convertToResponse<T>(something: T): HttpResponse<T> {
  return new HttpResponse<T>({body: something});
}
