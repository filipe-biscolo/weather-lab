import { Clouds } from './clouds';
import { Coord } from './coord';
import { Main } from './main';
import { Sys } from './sys';
import { Weather } from './weather';
import { Wind } from './wind';


export interface ListFind {
  id: number;
  name: string;
  coord: Coord;
  main: Main;
  dt: number;
  wind: Wind;
  sys: Sys;
  rain?: any;
  snow?: any;
  clouds: Clouds;
  weather: Weather[];
}