import Header from "@components/Header";
import Footer from "@components/Footer";
import CardAbout from "@components/CardAbout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const Svg = () => {
    return (
      <svg
        width="150"
        height="150"
        viewBox="0 0 220 221"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="110"
          cy="110.5"
          r="108"
          fill="#048C7E"
          fillOpacity="0.55"
        />
        <circle
          cx="110"
          cy="110.5"
          r="108"
          fill="#048C7E"
          fillOpacity="0.55"
        />
        <circle
          cx="110"
          cy="110.5"
          r="108"
          stroke="#048C7E"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <>
      <div className="flex flex-col md:h-[40rem] xl:h-screen sm:h-96 h-80">
        <Header />
        <div className="bg-[url('../public/backgroundPage.png')] bg-cover bg-center grow relative">
          <div className="absolute grow bg-black/60 w-full h-full flex justify-center">
            <CardAbout
              title="Prueba"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, nihil at omnis iusto quisquam, repudiandae eveniet doloribus aspernatur nobis sint eligendi excepturi facilis ullam architecto libero odio eum? Recusandae, tenetur."
            >
              <Svg />
            </CardAbout>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
