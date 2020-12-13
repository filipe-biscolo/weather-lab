import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/components/weather.service';

import { delay, map, switchMap, tap } from 'rxjs/operators';
import { empty, Subscription } from 'rxjs';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  form: FormGroup;
  url = '';

  private subscriptionSendHeaderChange: Subscription;
  private subscriptionGetByCityName: Subscription;
  
  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.subscriptionSendHeaderChange = 
    WeatherService.sendHeaderChange.subscribe(
      data => this.url = data,
      err => console.error(err));

    this.form = this.formBuilder.group({
      search: [null]
    });

    this.subscriptionGetByCityName = 
    this.form.get('search').valueChanges
    .pipe(
      // tap(() => this.form.get('search').value === '' ? this.clearList(): empty()),
      map(() => this.url === 'lista' ? '' : this.router.navigate([''])),
      delay(1500),
      switchMap(data => this.form.get('search').value && this.form.get('search').value !== '' ?
         this.weatherService.getByCityName(this.form.get('search').value): empty()),
      tap(console.log)
    )
    .subscribe(data => {
      console.log('Data: ', data);
      this.weatherService.sendCity(data);
    },
    err => console.error(err));
  }

  clearList(){
    let data = [];
    this.weatherService.sendCity(data);
  }

  ngOnDestroy() {
    this.subscriptionSendHeaderChange.unsubscribe();
    this.subscriptionGetByCityName.unsubscribe();
  }

  backPage(){
    this.form.reset();
    this.location.back();
  }

}
