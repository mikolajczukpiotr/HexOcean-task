import React, { useState } from "react";
import { GlobalState, useStateMachine } from "little-state-machine";
import { withRouter } from "react-router-dom";
import { Props } from "../types";
import ErrorAlert from "../components/ErrorAlert";
import clearAction from "../stateMachine/clearAction";
import Stepper from "../components/Stepper";

const prepareBody = (state: GlobalState) =>
  JSON.stringify({
    name: state.data?.name,
    preparation_time: state.data.preparation_time,
    type: state.data.type,
    diameter: state.data.type === "pizza" ? state.data.diameter : null,
    no_of_slices: state.data.type === "pizza" ? state.data.no_of_slices : null,
    slices_of_bread:
      state.data.type === "sandwich" ? state.data.slices_of_bread : null,
    spiciness_scale:
      state.data.type === "soup" ? state.data.spiciness_scale : null,
  });

const Result = (props: Props) => {
  const { state } = useStateMachine();
  const { actions } = useStateMachine({ clearAction });
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  function formatErrors(errors: { [fieldName: string]: string[] }) {
    let errorMessage = [];
    for (const [field, errorsArray] of Object.entries(errors)) {
      const formattedErrors = errorsArray.join(", ");
      errorMessage.push(`${field}: ${formattedErrors}`);
    }
    return errorMessage;
  }

  const onSubmit = async () => {
    setError(null);
    setDone(false);
    try {
      const response = await fetch(process.env.REACT_APP_API_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: prepareBody(state),
      });
      if (response.ok) {
        actions.clearAction();
        setDone(true);
      } else {
        const data = await response.json();
        setError(data);
      }
    } catch (error: any) {
      setError(error);
    }
  };
  const onBack = () => {
    props.history.goBack();
  };
  const onStart = () => {
    props.history.push("./");
  };
  return (
    <div className="form" data-testid="result">
      <Stepper currentStep={2} />
      <div className="separator" />
      <h1>SUMMARY</h1>
      {!done && state.data.name ? (
        <div data-testid="summary">
          <div>
            <p>Dish name: {state.data.name} </p>
            <p>Preparation time: {state.data.preparation_time}</p>
            <p>Dish type: {state.data.type}</p>
            {state.data.type === "pizza" && (
              <div>
                <p>Number of slices: {state.data.no_of_slices}</p>
                <p>Diameter: {state.data.diameter}</p>
              </div>
            )}
            {state.data.type === "soup" && (
              <p>Spiciness scale: {state.data.spiciness_scale}</p>
            )}
            {state.data.type === "sandwich" && (
              <p>Slices of bread: {state.data.slices_of_bread}</p>
            )}
            {error && (
              <ErrorAlert>
                {formatErrors(error).map((e) => (
                  <p>{e}</p>
                ))}
              </ErrorAlert>
            )}
          </div>

          <div className="footer">
            <button
              onClick={onBack}
              className="back-button"
              data-testid="result-go-back"
            >
              Back
            </button>
            <input
              type="submit"
              data-testid="sent-form"
              onClick={onSubmit}
              value="SENT"
              disabled={error ? true : false}
            />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="sent">SUCCES SENT</h2>
          <input
            type="submit"
            onClick={onStart}
            value="GO START"
            data-testid="result-go-start"
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(Result);
