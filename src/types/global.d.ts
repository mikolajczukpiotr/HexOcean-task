import "little-state-machine";
import { DishData } from "./index";

declare module "little-state-machine" {
  interface GlobalState {
    data: DishData;
  }
}
