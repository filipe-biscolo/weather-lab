import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {

  public arrCities = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    WeatherService.sendCity.subscribe(
      data => {
        this.arrCities = data.list
       console.log('Cities: ', data)
      },
      err => { console.error(err); });

      this.activatedRoute.params.subscribe(res => {
        this.weatherService.sendHeaderChange('search')
        console.log(res)
      });
  }

}
