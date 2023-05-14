import React from "react";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../stateMachine/updateAction";
import { withRouter } from "react-router-dom";
import { DishData, Props } from "../types";
import Stepper from "../components/Stepper";

const Sandwich = (props: Props) => {
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
    <form onSubmit={handleSubmit(onSubmit)} data-testid="sandwich-form">
      <div className="form">
        <Stepper currentStep={1} />
        <div className="separator"></div>
        <h2>Sandwich 🥪</h2>
        <label>Slices of bread:</label>
        <input
          type="number"
          id="slices_of_bread"
          data-testid="slices-of-bread-input"
          placeholder="4"
          defaultValue={state.data?.slices_of_bread}
          {...register("slices_of_bread", {
            required: {
              value: true,
              message: "Slices of bread is a required field",
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
        />
        <p className="error-message" data-testid="sandwich-error">
          {errors.slices_of_bread?.message}
        </p>
        <div className="footer">
          <button
            onClick={onBack}
            className="back-button"
            data-testid="sandwich-back-button"
          >
            Back
          </button>
          <input
            type="submit"
            value="Next"
            data-testid="sandwich-next-button"
          />
        </div>
      </div>
    </form>
  );
};

export default withRouter(Sandwich);
