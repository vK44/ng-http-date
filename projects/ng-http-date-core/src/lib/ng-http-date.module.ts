import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgHttpDateConverter} from './ng-http-date.converter';
import {NgHttpDateDateConverter} from './ng-http-date.date-converter';
import {NgHttpDateInterceptor} from './ng-http-date.interceptor';


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useExisting: NgHttpDateInterceptor, multi: true},
    {provide: NgHttpDateConverter, useExisting: NgHttpDateDateConverter, multi: true}
  ]
})
export class NgHttpDateModule {
}
