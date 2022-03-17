import DateTimeDisplay from "./datatimedisplay";
import { useCountdown } from "./useCountdown";
import React from "react";

const ShowCounter = ({ minutes, seconds }: any) => {
  return (
    <div className="show-counter">
      <div className="flex justify-center">
        <DateTimeDisplay value={minutes} isDanger={seconds <= 10 && minutes === 0} />
        <p className="mx-2 py-3 font-bold text-2xl rounded">:</p>
        <DateTimeDisplay value={seconds} isDanger={seconds <= 10 && minutes === 0} />
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    history.back();
  }

  return <ShowCounter minutes={minutes} seconds={seconds} />;
};

export default CountdownTimer;
