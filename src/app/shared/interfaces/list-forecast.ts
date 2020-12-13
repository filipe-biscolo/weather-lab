import { Main } from './main';
import { Weather } from './weather';
import { Clouds } from './clouds';
import { Wind } from './wind';
import { Rain } from './rain';
import { Sys } from './sys';

export interface ListForecast {
  dt: any;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: string;
}