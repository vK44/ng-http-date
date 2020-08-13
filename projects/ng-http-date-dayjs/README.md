# NgHttpDate Day.js Plugin

## What?

Day.js plugin for [NgHttpDate](https://github.com/vkennke/ng-http-date).

## Installation

You need to install `ng-http-date` first. See [NgHttpDate](https://github.com/vkennke/ng-http-date) for instructions.

Install `ng-http-date-dayjs` via npm or yarn or any other compatible packet manager:

```shell script
npm i ng-http-date-dayjs
```

If you're not using the current Angular version you should use an older version of `ng-htt-date-dayjs`:

| Angular           | 10.0.x | 9.x | 8.2.x | older         |
|-------------------|--------|-----|-------|---------------|
| ng-http-date-days | 10.x   | 9.x | 8.x   | not supported |


Import the `NgHttpDateDayjsModule` in your root module:

```typescript
import {NgHttpDateModule} from 'ng-http-date-core';
import {NgHttpDateDayjsModule} from 'ng-http-date-dayjs';

@NgModule({
  declarations: [...],
  imports: [
    ...
    NgHttpDateModule,
    NgHttpDateDayjsModule,
    ...
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule {
  ...
}
```