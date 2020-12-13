import { ListFind } from "./list-find";

export interface BodyFind {
  message: string;
  cod: string;
  count: number;
  list: ListFind[];
}