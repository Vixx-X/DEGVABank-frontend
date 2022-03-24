import DateTimeDisplay from "./datatimedisplay";
import { useCountdown } from "./useCountdown";
import React from "react";

const ShowCounter = ({ minutes, seconds, mode }: any) => {
  return (
    <div className="show-counter">
      <div className="flex">
        <DateTimeDisplay
          value={minutes}
          mode={mode != "payway"}
          isDanger={seconds <= 10 && minutes === 0}
        />
        <p className="mx-2 py-3 font-bold text-2xl rounded">:</p>
        <DateTimeDisplay
          value={seconds}
          mode={mode != "payway"}
          isDanger={seconds <= 10 && minutes === 0}
        />
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate, mode, fun }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  if (days + hours + minutes + seconds <= 0) {
    if (mode === "payway") {
      history.back();
    } else {
      fun();
    }
  }

  return <ShowCounter minutes={minutes} seconds={seconds} mode={mode} />;
};

export default CountdownTimer;
