import { GlobalState } from "little-state-machine";
import { DishData } from "../types";

export default function updateAction(
  state: GlobalState,
  payload: DishData
): GlobalState {
  return {
    ...state,
    data: {
      ...state.data,
      ...payload,
    },
  };
}
