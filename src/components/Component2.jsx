import React from "react";
import CircularWithValueLabel from "./Component3";

const Component2 = ({ progressStep, timeValue }) => {
  return (
    <div>
      <p>Progress Step in Component2 : {progressStep}</p>

      <button>Previous</button>
      <button>Next</button>
      <CircularWithValueLabel
        progressStep={progressStep}
        timeValue={timeValue}
      />
    </div>
  );
};

export default Component2;
