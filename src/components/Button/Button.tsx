import React from "react";

interface Button{
  text:String;
  handleClick:()=>void;
}

const Button = ({text,handleClick}:Button) => {
  return <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{text}</button>;
};

export default Button;
