import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/components/weather.service';

import { delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formulario: FormGroup;
  url = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    WeatherService.sendHeaderChange.subscribe(
      data => {
        this.url = data;
      },
      err => { console.error(err); });

    this.formulario = this.formBuilder.group({
      search: [null]
    });

    this.formulario.get('search').valueChanges
    .pipe(
      delay(1000),
      switchMap(data => data ?
         this.weatherService.getByCityName(this.formulario.get('search').value):empty()),
      tap(console.log)
    )
    .subscribe(data => {
      console.log('Data: ', data);
      this.weatherService.sendCity(data);
    });
  }



}
