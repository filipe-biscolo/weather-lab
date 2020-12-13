import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';

import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format'

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {

  dataWeather: any;
  dateNow = new Date();

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
    this.activatedRoute.params.subscribe(params => {
      this.weatherService.getWeatherByCityID(params.id)
        .subscribe(
          data => {
            console.log('data', data)
            this.dataWeather = data;
            this.dataWeather.sys.sunrise = format(fromUnixTime(this.dataWeather.sys.sunrise), 'HH:mm');
            this.dataWeather.sys.sunset = format(fromUnixTime(this.dataWeather.sys.sunset), 'HH:mm');
          },
          err => console.error(err)
        );
    });
  }

  convertTime(time) {
    time = new Date(time * 1000);
    time = time.toISOString().match(/(\d{2}:\d{2}:\d{2})/);

    return time;
  }

}
