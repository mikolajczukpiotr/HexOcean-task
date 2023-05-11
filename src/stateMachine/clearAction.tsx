import { GlobalState } from "little-state-machine";
import { DishData } from "../types";

export default function clearAction(
  state: GlobalState,
  payload: DishData
): GlobalState {
  return {
    data: {
      ...payload,
    },
  };
}
