import React from "react";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../stateMachine/updateAction";
import { withRouter } from "react-router-dom";

import "../index.css";
import { DishData, Props } from "../types";

const ChooseDish = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DishData>();
  const { actions, state } = useStateMachine({
    updateAction,
  });

  const onSubmit = (data: DishData) => {
    actions.updateAction(data);
    props.history.push(`./${data.type}`);
  };
  return (
    <div className="main">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <label>Dish name</label>
          <input
            type="text"
            placeholder="margherita"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "Dish name is a required field",
              },
              maxLength: 80,
            })}
            defaultValue={state.data?.name}
          />
          <p className="error-message">{errors.name?.message}</p>
          <label>Preparation time</label>
          <input
            type="time"
            step="2"
            id="preparation_time"
            {...register("preparation_time", {
              required: {
                value: true,
                message: "Preparation time is a required field",
              },
            })}
            defaultValue={state.data?.preparation_time}
          />
          <p className="error-message">{errors.preparation_time?.message}</p>
          <label>Dish type</label>
          <select
            {...register("type", { required: true })}
            defaultValue={state.data?.type}
          >
            <option value="pizza">Pizza 🍕</option>
            <option value="soup">Soup 🥣</option>
            <option value="sandwich">Sandwich 🥪</option>
          </select>
          <br />
          <input type="submit" value="Next" />
        </div>
      </form>
    </div>
  );
};

export default withRouter(ChooseDish);
