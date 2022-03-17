import React from "react";

Date;

const DateTimeDisplay = ({ value, isDanger, mode }: any) => {
  const newValue = value.toString().length == 1 ? `0${value}` : `${value}`;
  return (
    <div
      className={
        isDanger
          ? "text-red-700 bg-red-200 p-3 rounded"
          : mode
          ? "text-light bg-primary p-3 rounded"
          : "text-light bg-gray-700 p-3 rounded"
      }
    >
      <p className="font-bold text-2xl">{newValue}</p>
    </div>
  );
};

export default DateTimeDisplay;
