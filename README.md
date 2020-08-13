# NgHttpDate

## What?

NgHttpDate is an [Angular](https://github.com/angular/angular) library that detects **dates** in HTTP JSON reponses and modifies the responses to contain `Date` objects (or Day.js or Moment via Plugin) instead of `String` objects.

## Installation

Install `ng-http-date` via npm or yarn or any other compatible packet manager:

```shell script
npm i ng-http-date
```

If you're not using the current Angular version you should use an older version of `ng-htt-date`:

| Angular      | 10.x | 9.x | 8.2.x | older         |
|--------------|--------|-----|-------|---------------|
| ng-http-date | 10.x   | 9.x | 8.x   | not supported |


Import the `NgHttpDateModule` in your root module:

```typescript
import {NgHttpDateModule} from 'ng-http-date-core';

@NgModule({
  declarations: [...],
  imports: [
    ...
    NgHttpDateModule,
    ...
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule {
  ...
}
```

## Why?

Angular is not converting dates in JSON to EcmaScript `Date` objects. Even if you declare properties of your HTTP call return type as `Date` they're just `String`s at runtime:

```typescript
export class ResultOfHttpCall {
  someProperty: Date;
}

...

this.http.get<ResultOfHttpCall>('someURL').subscribe((result: ResultOfHttpCall) => {
  typeof result.someProperty; // string
  result.someProperty.toISOString(); // ERROR: someProperty.toISOString is not a function
}
```

## How?

NgHttpDate registers an `HttpInterceptor` which tests each property of the response via an ISO8601 regex. 
When a date is detected, the response is modified to create a `Date` object for that property.

## Performance

The core library is 2 kB gzipped. The gzipped size of the plugins is 1 kB each. 
The detection and creation of `Date` objects has nearly no performance impact. For example, modifying a [small size nested JSON object](https://github.com/vkennke/ng-http-date/blob/master/projects/ng-http-date-core/src/lib/ng-http-date.interceptor.spec.ts#L82-L104) 1.000.000 times is done in ~ 8 seconds.
That's 0.008 ms per object.

## Plugins

If you want NgHttpDate to use Day.js objects or Moment objects instead of EcmaScript Dates you can install the appropriate plugin:

```shell script
npm i ng-http-date-dayjs

```
or
```shell script
npm i ng-http-date-moment
```

You also have to import the appropriate module in your root module:

```typescript
imports: [
  ...
  NgHttpDateDayjsModule,
  ...
]
```

or

```typescript
imports: [
  ...
  NgHttpDateMomentModule,
  ...
]
```

## What's next?

Currently only ISO8601 compliant dates are recognized and converted. It's planned for the next minor release to provide a way to configure this behavior. 
