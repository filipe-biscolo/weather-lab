import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component';

const routes: Routes = [
  {
    path: "",
    component: CitiesListComponent
  },
  {
    path: "details/:id",
    component: CityDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
