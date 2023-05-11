import { RouteComponentProps } from "react-router-dom";

export type DishData = {
  name: string;
  preparation_time: string;
  type: string;
  diameter?: number;
  no_of_slices?: number;
  slices_of_bread?: number;
  spiciness_scale?: number;
};

export interface Props extends RouteComponentProps {}
