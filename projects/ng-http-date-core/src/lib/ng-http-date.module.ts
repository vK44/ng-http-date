import {ModuleWithProviders, NgModule} from '@angular/core';
import {DefaultNgHttpDateConfiguration, NgHttpDateConfiguration} from './ng-http-date.configuration';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgHttpDateInterceptor} from './ng-http-date.interceptor';
import {NgHttpDateDateConverter} from './ng-http-date.date-converter';
import {NgHttpDateConverter} from './ng-http-date.converter';


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: []
})
export class NgHttpDateModule {

  static forRoot(config: NgHttpDateConfiguration = new DefaultNgHttpDateConfiguration()): ModuleWithProviders<NgHttpDateModule> {
    return {
      ngModule: NgHttpDateModule,
      providers: [
        {provide: NgHttpDateConfiguration, useValue: config},
        {provide: NgHttpDateConverter, useExisting: NgHttpDateDateConverter, multi: true},
        {provide: HTTP_INTERCEPTORS, useExisting: NgHttpDateInterceptor, multi: true}
      ]
    };
  }
}
