import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format'
import { WeatherService } from 'src/app/shared/services/weather.service';
import { ListForecast } from 'src/app/shared/interfaces/list-forecast';
import { BodyWeather } from 'src/app/shared/interfaces/body-weather';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit, OnDestroy {

  dataWeather: BodyWeather;
  arrForecast: Array<ListForecast> = [];
  dateNow = new Date();

  private subscriptionActivatedRoute: Subscription;
  private subscriptionGetWeatherByCityID: Subscription;
  private subscriptionGetForecastByLocationID: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.dataWeather = {
      name: '',
      sys: {
        country: ''
      },
      main: {
        temp: null,
        temp_max: null,
        temp_min: null
      },
      weather: [
        { icon: '', description: ''}
      ]
    };
  }

  ngOnInit(): void {
    this.weatherService.sendHeaderChange('details');
    this.subscriptionActivatedRoute = 
    this.activatedRoute.params.subscribe(params => {
      this.loadCityData(params.id);
      this.loadCityForecast(params.id);
    });
  }

  ngOnDestroy() {
    this.subscriptionActivatedRoute.unsubscribe();
    this.subscriptionGetWeatherByCityID.unsubscribe();
    this.subscriptionGetForecastByLocationID.unsubscribe();
  }

  loadCityData(id) {
    this.subscriptionGetWeatherByCityID =
      this.weatherService.getWeatherByCityID(id)
        .subscribe(data => {
          this.dataWeather = data;
          this.dataWeather.main.temp = Math.round(this.dataWeather.main.temp * 10) / 10;
          this.dataWeather.sys.sunrise = format(fromUnixTime(this.dataWeather.sys.sunrise), 'HH:mm');
          this.dataWeather.sys.sunset = format(fromUnixTime(this.dataWeather.sys.sunset), 'HH:mm');

        }, err => console.error(err));
  }

  loadCityForecast(id) {
    this.subscriptionGetForecastByLocationID =
      this.weatherService.getForecastByLocationID(id)
        .subscribe(data => {
          this.arrForecast = data.list;
          this.arrForecast.map(data => {
            data.dt = fromUnixTime(data.dt);
            data.main.temp_max = Math.round(data.main.temp_max * 10) / 10;
            data.main.temp_min = Math.round(data.main.temp_min * 10) / 10;
          });
        }, err => console.error(err));
  }

}
