import Header from "@components/Header";
import Footer from "@components/Footer";
import CardAbout from "@components/CardAbout";
import type { NextPage } from "next";
import Logotype from "@components/Logotype";
import Link from "next/link";

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
        <circle cx="110" cy="110.5" r="108" fill="#048C7E" fillOpacity="0.55" />
        <circle cx="110" cy="110.5" r="108" fill="#048C7E" fillOpacity="0.55" />
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
          <div className="absolute grow bg-black/60 w-full h-full">
            <div>
              <Logotype
                classnameBox="h-28 justify-center my-16"
                sizeTitle="text-7xl"
                sizeSubTitle="text-4xl"
                mode="light"
              />
              <div className="flex justify-center">
                <CardAbout
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis corrupti sapiente illo quibusdam quas qui inventore quasi aliquam exercitationem, deleniti fugit quis dolores, iste nostrum nulla, possimus itaque! Molestias, a?"
                  title="Sobre Nosotros"
                >
                  <Svg />
                </CardAbout>
              </div>
            </div>
            <section className="flex xl:w-[70rem] max-w-[90%] mx-auto justify-between mt-32">
              <div className="basis-2/5 flex flex-col text-center gap-y-4 transition-opacity">
              {/* opacity-0 hover:opacity-100 */}
                <h4 className="text-light text-3xl text-shadow">
                  Persona Natural
                </h4>
                <p className="text-light text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam quasi fugiat et reiciendis est.
                </p>
                <div className="flex flex-col gap-y-4">
                  <Link href="/">
                    <a className="bg-primary hover:bg-blue-700 text-light font-bold py-2 px-4 cursor-pointer rounded-full w-full uppercase text-center transition">
                      Iniciar Sesión
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="bg-light hover:bg-slate-50  text-dark font-bold rounded-full py-2 px-4 cursor-pointer uppercase text-center transition">
                      Regístrate
                    </a>
                  </Link>
                </div>
              </div>
              <div className="basis-2/5 flex flex-col text-center gap-y-4 transition-opacity">
              {/* opacity-0 hover:opacity-100 */}
                <h4 className="text-light text-3xl text-shadow">
                  Persona Natural
                </h4>
                <p className="text-light text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam quasi fugiat et reiciendis est.
                </p>
                <div className="flex flex-col gap-y-4">
                  <Link href="/">
                    <a className="bg-primary hover:bg-blue-700 text-light font-bold py-2 px-4 cursor-pointer rounded-full w-full uppercase text-center transition">
                      Iniciar Sesión
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="bg-light hover:bg-slate-50  text-dark font-bold rounded-full py-2 px-4 cursor-pointer uppercase text-center transition">
                      Regístrate
                    </a>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
