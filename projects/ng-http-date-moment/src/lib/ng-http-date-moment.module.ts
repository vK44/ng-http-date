import {NgModule} from '@angular/core';
import {NgHttpDateConverter} from 'ng-http-date-core';
import {NgHttpDateMomentMomentConverter} from './ng-http-date-moment.moment-converter';


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [{provide: NgHttpDateConverter, useExisting: NgHttpDateMomentMomentConverter, multi: true}]
})
export class NgHttpDateMomentModule {
}
