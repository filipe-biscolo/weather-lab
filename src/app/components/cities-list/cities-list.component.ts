import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit, OnDestroy {

  public arrCities = [];

  private subscriptionSendHeaderChange: Subscription;

  constructor(
    private router: Router,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherService.sendHeaderChange('search');
    this.subscriptionSendHeaderChange =
      WeatherService.sendCity.subscribe(data => {
        this.arrCities = data.list;
        this.arrCities.map(city => {
          city.main.temp = Math.round(city.main.temp * 10) / 10;
          city.main.temp_max = Math.round(city.main.temp_max * 10) / 10;
          city.main.temp_min = Math.round(city.main.temp_min * 10) / 10;
        });
      }, err => console.error(err));
  }

  ngOnDestroy() {
    this.subscriptionSendHeaderChange.unsubscribe();
  }

  openDetails(id){
    this.router.navigate(['details', id]);
  }
}
