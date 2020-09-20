# NgHttpDate Moment Plugin

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  
[npm-image]: https://img.shields.io/npm/v/ng-http-date-moment.svg
[npm-url]: https://npmjs.org/package/ng-http-date-moment
[downloads-image]: https://img.shields.io/npm/dm/ng-http-date-moment.svg
[downloads-url]: https://npmjs.org/package/ng-http-date-moment  


## What?

Moment plugin for [NgHttpDate](https://github.com/vkennke/ng-http-date).

## Installation

You need to install `ng-http-date` first. See [NgHttpDate](https://github.com/vkennke/ng-http-date) for instructions.

Install `ng-http-date-moment` via npm or yarn or any other compatible packet manager:

```shell script
npm i ng-http-date-moment
```

If you're not using the current Angular version you should use an older version of `ng-htt-date-moment`:

| Angular             |  10.x  | 9.x | 8.2.x | older         |
|---------------------|--------|-----|-------|---------------|
| ng-http-date-moment |  10.x  | 9.x | 8.x   | not supported |


Import the `NgHttpDateMomentModule` in your root module:

```typescript
import {NgHttpDateModule} from 'ng-http-date-core';
import {NgHttpDateMomentModule} from 'ng-http-date-moment';

@NgModule({
  declarations: [...],
  imports: [
    ...
    NgHttpDateModule.forRoot(),
    NgHttpDateMomentModule,
    ...
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule {
  ...
}
```
