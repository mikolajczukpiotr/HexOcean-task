import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../stateMachine/updateAction";
import { withRouter } from "react-router-dom";
import { DishData, Props } from "../types";
import Stepper from "../components/Stepper";

const Soup = (props: Props) => {
  const { register, handleSubmit } = useForm<DishData>();
  const { actions, state } = useStateMachine({ updateAction });
  const [spiciness, setSpiciness] = useState(state.data?.spiciness_scale);
  const onSubmit = (data: DishData) => {
    actions.updateAction(data);
    props.history.push("./Result");
  };
  const onBack = () => {
    props.history.goBack();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="soup-form">
      <div className="form">
        <Stepper currentStep={1} />
        <div className="separator"></div>
        <h1>Soup 🍜</h1>
        <label>Spiciness scale:</label>
        <div className="scale">
          <div className="icon">🥣</div>
          <input
            type="range"
            min="1"
            max="10"
            data-testid="soup-input"
            id="spiciness_scale"
            {...register("spiciness_scale", {
              required: {
                value: true,
                message: "Dish name is a required field",
              },
              min: {
                value: 0,
                message: "Value is incorrect",
              },
              max: {
                value: 10,
                message: "Value is incorrect",
              },
            })}
            value={spiciness}
            onChange={(e) => setSpiciness(parseInt(e.target.value, 10))}
          />
          <div className="icon">🌶️</div>
        </div>
        {spiciness}
        <div className="footer">
          <button
            onClick={onBack}
            className="back-button"
            data-testid="soup-back-button"
          >
            Back
          </button>
          <input type="submit" value="Next" data-testid="soup-next-button" />
        </div>
      </div>
    </form>
  );
};

export default withRouter(Soup);
