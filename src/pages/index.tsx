import type { NextPage } from "next";
import Button from "@components/Button/Button";
const Home: NextPage = () => {
  const Svg = () => {
    return (
      <svg
        className="fill-current w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
    );
  };

  const handleClick = () => {
    console.log("Click!");
  };

  return (
    <div>
      <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={handleClick}>
          <Svg />
          <p className="mx-2">Prueba</p>
      </Button>
    </div>
  );
};

export default Home;
