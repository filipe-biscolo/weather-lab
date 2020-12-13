import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { BodyFind } from '../interfaces/body-find';
import { BodyForecast } from '../interfaces/body-forecast';
import { BodyWeather } from '../interfaces/body-weather';

const apiURL = 'https://api.openweathermap.org/data/2.5';
const appID = '76d1b43ba3695cfae59aa9f7dc9b4877';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  static sendCity = new EventEmitter();
  static sendHeaderChange = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  sendCity(data) {
    WeatherService.sendCity.emit(data);
  }

  sendHeaderChange(data) {
    WeatherService.sendHeaderChange.emit(data);
  }

  getByCityName(city) {
    return this.http.get<BodyFind>(`${apiURL}/find?q=${city}&appid=${appID}&units=metric`)
    .pipe(
      map(result => {
        let arr = [];
        result ? arr = result.list : arr = [];
        
        return arr;
      })
    )
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 400) {
          return [];
        }

        return throwError(error);
      })
    );
  }

  getWeatherByCityID(cityID): Observable<BodyWeather> {
    return this.http.get<BodyWeather>(`${apiURL}/weather?id=${cityID}&appid=${appID}&units=metric`);
  }

  getForecastByLocationID(locationID): Observable<BodyForecast> {
    return this.http.get<BodyForecast>(`${apiURL}/forecast?id=${locationID}&appid=${appID}&units=metric`);
  }
}
