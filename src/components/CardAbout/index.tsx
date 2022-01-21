import React from "react";

interface CardAboutProps {
  image: JSX.Element;
  title: string;
  imageFirst: boolean;
  children: JSX.Element[] | JSX.Element;
  color: string;
}

const CardAbout = ({ image, title, imageFirst, color, children }: CardAboutProps) => {
  return (
    <div className="flex justify-around items-center xl:w-[60rem] max-w-[90%] h-1/3 bg-white px-3 mx-auto">
      {imageFirst && <div className={`rounded-full bg-${color} w-52 h-52 p-8 border-2 border-dark${color}`}>{image}</div>}
      <div className="font-montserrat items-center w-[65%] p-2">
        <p className="text-center uppercase font-bold text-xl tracking-wider">
          {title}
        </p>
        <p className="text-center text-base mt-4">{children}</p>
      </div>
      {!imageFirst && <div className={`rounded-full bg-${color} w-52 h-52 p-8 border-2 border-dark${color}`}>{image}</div>}
    </div>
    
  );
};

export default CardAbout;
