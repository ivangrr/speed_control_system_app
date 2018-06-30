import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalvariablesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Globalvariables {
  measureUnit;

  constructor() {
    this.measureUnit = 'Km/h';
  }

  setMeasureUnit(value){
    this.measureUnit = value;
  }

  getMeasureUnit(){
    return this.measureUnit;
  }

}
