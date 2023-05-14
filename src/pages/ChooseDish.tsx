import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../stateMachine/updateAction";
import { withRouter } from "react-router-dom";

import "../index.css";
import { DishData, Props } from "../types";
import Stepper from "../components/Stepper";
import InputMask from "../utils/TimeInput";

const ChooseDish = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DishData>();
  const { actions, state } = useStateMachine({
    updateAction,
  });
  const [preparationTime, setPreparationTime] = useState(
    state.data?.preparation_time ?? ""
  );

  const onSubmit = (data: DishData) => {
    actions.updateAction(data);
    props.history.push(`./${data.type}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="choose-dish-form">
      <div className="form">
        <Stepper currentStep={0} />
        <div className="separator"></div>
        <label>Dish name</label>
        <input
          type="text"
          placeholder="margherita"
          id="name"
          data-testid="dish-name-input"
          {...register("name", {
            required: {
              value: true,
              message: "Dish name is a required field",
            },
            minLength: {
              value: 3,
              message: "Value is incorrect",
            },
            maxLength: {
              value: 99,
              message: "Value is incorrect",
            },
          })}
          defaultValue={state.data?.name}
        />
        <p className="error-message" data-testid="dish-name-error">
          {errors.name?.message}
        </p>
        <label>Preparation time</label>
        <input
          type="text"
          id="preparation_time"
          data-testid="preparation-time-input"
          placeholder="HH:MM:SS"
          {...register("preparation_time", {
            required: {
              value: true,
              message: "Preparation time is a required field",
            },
            pattern: {
              value: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/,
              message: "Preparation time must be in HH:MM:SS format",
            },
          })}
          value={preparationTime}
          onChange={(e) => {
            const { value } = e.target;
            setPreparationTime(
              value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1:$2")
                .replace(/(\d{2})(\d{1,2})/, "$1:$2")
                .replace(/(:\d{2})\d+?$/, "$1")
            );
          }}
        />
        <p className="error-message" data-testid="preparation-time-error">
          {errors.preparation_time?.message}
        </p>
        <label>Dish type</label>
        <select
          {...register("type", { required: true })}
          defaultValue={state.data?.type}
          data-testid="dish-type-select"
        >
          <option value="pizza">Pizza 🍕</option>
          <option value="soup">Soup 🥣</option>
          <option value="sandwich">Sandwich 🥪</option>
        </select>
        <br />
        <input type="submit" value="Next" />
      </div>
    </form>
  );
};

export default withRouter(ChooseDish);
