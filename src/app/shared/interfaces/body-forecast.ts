import { City } from "./city";
import { ListForecast } from "./list-forecast";

export interface BodyForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ListForecast[];
  city: City;
}