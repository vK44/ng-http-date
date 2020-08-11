import {NgModule} from '@angular/core';
import {NgHttpDateConverter} from 'ng-http-date-core';
import {NgHttpDateDayjsDayjsConverter} from './ng-http-date-dayjs.dayjs-converter';


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [{provide: NgHttpDateConverter, useExisting: NgHttpDateDayjsDayjsConverter, multi: true}]
})
export class NgHttpDateDayjsModule {
}
