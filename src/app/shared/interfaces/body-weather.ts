import { Coord } from './coord';
import { Weather } from './weather';
import { Main } from './main';
import { Wind } from './wind';
import { Clouds } from './clouds';
import { Sys } from './sys';

export interface BodyWeather {
  coord?: Coord;
  weather: Weather[];
  base?: string;
  main: Main;
  visibility?: number;
  wind?: Wind;
  clouds?: Clouds;
  dt?: number;
  sys: Sys;
  timezone?: number;
  id?: number;
  name: string;
  cod?: number;
}
