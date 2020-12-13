import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup } from '@angular/forms';
import { delay, map, switchMap } from 'rxjs/operators';
import { empty, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { WeatherService } from 'src/app/shared/services/weather.service';

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
      map(() => this.url === 'lista' ? '' : this.router.navigate([''])),
      delay(1200),
      switchMap(() => this.form.get('search').value && this.form.get('search').value !== '' ?
         this.weatherService.getByCityName(this.form.get('search').value): this.clearList())
    )
    .subscribe(data => {
      this.weatherService.sendCity(data);
    },
    err => { console.error(err); });
  }

  clearList(){
    let data = [];
    this.weatherService.sendCity(data);
    return empty();
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
