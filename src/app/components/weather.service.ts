import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get(`${apiURL}/find?q=${city}&appid=${appID}&units=metric`);
  }

  getWeatherByCityID(cityID) {
    return this.http.get(`${apiURL}/weather?id=${cityID}&appid=${appID}&units=metric`);
  }

  getForecastByLocationID(locationID): Observable<any> {
    return this.http.get<any>(`${apiURL}/forecast?id=${locationID}&appid=${appID}&units=metric`);
  }
}
