import { Injectable } from '@angular/core';
import { of } from 'rxjs';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private people = require('../assets/people.json');

  constructor() { }

  public getData() {
    // return this.http.get(this.getProductsUrl);
    return of(this.people);
}
}
