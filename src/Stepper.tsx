import React from "react";
import "./index.css";

const steps = [
  {
    title: "Select dishes",
  },
  {
    title: "Selection of add-ons",
  },
  {
    title: "Summary",
  },
];

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="stepper-progress">
      {steps.map((step, index) => (
        <div className="stepper-progress-main">
          <div
            key={index}
            className={`stepper-progress-step ${
              index <= currentStep ? "active" : ""
            }`}
          >
            <svg className="svg-icon" viewBox="0 0 1024 1024">
              <path
                d="M469.333333 640l0.384 0.384L469.333333 640z m-106.282666 0l-0.384 0.384 0.384-0.384z m48.512 106.666667a87.466667 87.466667 0 0 1-61.653334-24.874667l-179.52-173.632a67.797333 67.797333 0 0 1 0-98.24c28.032-27.157333 73.493333-27.157333 101.589334 0l139.584 134.997333 319.168-308.544c28.032-27.157333 73.493333-27.157333 101.589333 0a67.925333 67.925333 0 0 1 0 98.24L472.981333 722.069333A87.530667 87.530667 0 0 1 411.562667 746.666667z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          {step.title}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
