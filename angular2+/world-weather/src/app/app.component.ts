import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ww-root',
  templateUrl: './partials/app.component.html'
})

@Injectable()
export class AppComponent {
  title = 'WorldWeather';
  subTitle = 'Weather by City and Country Across the World';

  complete: boolean;
  req: boolean;

  nodata: boolean;
  notFound: string;
  error: boolean;

  content: any;
  temp: any;
  tp: string;

  wk = '0b7bf34153fac025d3c03c7540685834';
  city = '';
  country = '';

  private configUrl: string;

  constructor(private http: HttpClient) { }

  getWeather() {
    if (this.city !== '' && this.country !== '') {
      this.complete = true;
      this.req = false;
      this.configUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city + ',' + this.country + '&units=imperial&APPID=' + this.wk;
      this.http.get(this.configUrl, { responseType: 'json' })
        .subscribe(
          data => {
            this.content = data;
            this.content = Array.of(this.content);
            this.error = false;
          },
          (err: HttpErrorResponse) => {
            this.error = true;
            this.notFound = err.error.message;
          }
        );
    } else {
      this.complete = false;
      this.req = true;
    }
  }

  clearWeather() {
    this.city = '';
    this.country = '';
    this.complete = false;
    this.req = false;
    this.error = false;
  }
}
