import React from "react";

interface CardAboutProps {
  children: JSX.Element[] | JSX.Element;
  title:string;
  content:string;
}

const CardAbout = ({title,content,children}: CardAboutProps) => {
  return (
    <div className="flex justify-around items-center w-[40em] h-1/3 bg-white px-3">
      <div>
          {children}      
      </div>
      <div className="font-montserrat items-center w-1/2">
          <p className="text-center uppercase font-bold text-xl tracking-wider">{title}</p>
          <p className="text-center text-sm">
            {content}
          </p>
      </div>
    </div>
  );
};

export default CardAbout;
