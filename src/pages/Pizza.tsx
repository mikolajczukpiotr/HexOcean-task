import React from "react";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../stateMachine/updateAction";
import { withRouter } from "react-router-dom";
import { DishData, Props } from "../types";
import Stepper from "../components/Stepper";

const Pizza = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DishData>();
  const { actions, state } = useStateMachine({ updateAction });
  const onSubmit = (data: DishData) => {
    actions.updateAction(data);
    props.history.push("./Result");
  };
  const onBack = () => {
    props.history.goBack();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="pizza-form">
      <div className="form">
        <Stepper currentStep={1} />
        <div className="separator"></div>
        <h2>Pizza 🍕</h2>
        <label>Number of slices:</label>
        <input
          type="number"
          id="no_of_slices"
          data-testid="no_of_slices-input"
          placeholder="4"
          {...register("no_of_slices", {
            required: {
              value: true,
              message: "Number of slices is a required field",
            },
            min: {
              value: 0,
              message: "Value is incorrect",
            },
            max: {
              value: 999,
              message: "Value is incorrect",
            },
          })}
          defaultValue={state.data?.no_of_slices}
        />
        <p className="error-message">{errors.no_of_slices?.message}</p>
        <label>Diameter:</label>
        <input
          type="number"
          id="diameter"
          data-testid="diameter-input"
          step="0.1"
          placeholder="32"
          {...register("diameter", {
            required: {
              value: true,
              message: "Diameter is a required field",
            },
            min: {
              value: 0,
              message: "Value is incorrect",
            },
            max: {
              value: 999,
              message: "Value is incorrect",
            },
          })}
          defaultValue={state.data?.diameter}
        />
        <p className="error-message" data-testid="pizza-error">
          {errors.diameter?.message}
        </p>
        <div className="footer">
          <button
            onClick={onBack}
            className="back-button"
            data-testid="pizza-back-button"
          >
            Back
          </button>
          <input type="submit" value="Next" data-testid="pizza-next-button" />
        </div>
      </div>
    </form>
  );
};

export default withRouter(Pizza);
