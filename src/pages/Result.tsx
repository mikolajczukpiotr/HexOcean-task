import React, { useState } from "react";
import { GlobalState, useStateMachine } from "little-state-machine";
import { withRouter } from "react-router-dom";
import { Props } from "../types";
import ErrorAlert from "../ErrorAlert";
import clearAction from "../stateMachine/clearAction";

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
    let errorMessage = "";
    for (const [field, errorsArray] of Object.entries(errors)) {
      const formattedErrors = errorsArray.join(", ");
      errorMessage += `${field}: ${formattedErrors}<br/>`;
    }
    return errorMessage;
  }

  const onSubmit = async () => {
    setError(null);
    setDone(false);
    try {
      const response = await fetch(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: prepareBody(state),
        }
      );
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
  return (
    <div className="main">
      <div className="form">
        <h1>SUMMARY</h1>
        {!done ? (
          <div>
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
              {error && <ErrorAlert description={formatErrors(error)} />}
            </div>

            <div className="footer">
              <button onClick={onBack} className="back-button">
                Back
              </button>
              <input type="submit" onClick={onSubmit} value="SENT" />
            </div>
          </div>
        ) : (
          <h2 className="sent">SUCCES SENT</h2>
        )}
      </div>
    </div>
  );
};

export default withRouter(Result);
