import Header from "@components/Header";
import Footer from "@components/Footer";
import CardAbout from "@components/CardAbout";
import type { NextPage } from "next";
import Logotype from "@components/Logotype";
import Link from "next/link";
import { GroupSvg, LockSvg, SpeedSvg } from "@public/assets/imagesSvg";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-[40rem] xl:h-screen">
        <Header />
        <div className="md:bg-[url('../public/backgroundPage.png')] bg-[url('../public/backgroundPage3.jpg')] bg-cover bg-center grow relative">
          <div className="absolute grow bg-black/60 w-full h-full">
            <div className="max-w-[90%] mx-auto">
              <Logotype
                classnameBox="h-16 md:h-24 md:justify-center my-16"
                sizeTitle="text-4xl md:text-7xl"
                sizeSubTitle="text-xl md:text-4xl"
                mode="light"
              />
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
      <section className="flex flex-col gap-y-16 justify-center my-16">
        <CardAbout
          image={<GroupSvg />}
          title="Sobre Nosotros"
          imageFirst={true}
          color="secundary"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore,
            quas. Saepe, cumque ad quis explicabo unde adipisci. Optio vitae
            aspernatur in, velit corrupti a, officia accusantium reiciendis eum
            quaerat libero!
          </p>
        </CardAbout>
        <CardAbout
          image={<LockSvg />}
          title="Mayor Seguridad"
          imageFirst={false}
          color="third"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore,
            quas. Saepe, cumque ad quis explicabo unde adipisci. Optio vitae
            aspernatur in, velit corrupti a, officia accusantium reiciendis eum
            quaerat libero!
          </p>
        </CardAbout>
        <CardAbout
          image={<SpeedSvg />}
          title="Mayor Rapidez"
          imageFirst={true}
          color="primary"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore,
            quas. Saepe, cumque ad quis explicabo unde adipisci. Optio vitae
            aspernatur in, velit corrupti a, officia accusantium reiciendis eum
            quaerat libero!
          </p>
        </CardAbout>
      </section>
      <section className="bg-[url('../public/backgroundPage2.png')] bg-cover bg-center h-[30rem] relative">
        <div className="absolute bg-black/60 w-full h-[25rem] top-10">
          <div className="flex grow flex-col items-center justify-center gap-y-6 h-full max-w-[90%] mx-auto text-center">
            <h4 className="text-light text-3xl text-shadow">
              ¿Quieres hacer tus compras de manera segura?
            </h4>
            <p className="text-light text-2xl">
              Hacemos de tu experiencia de compra la mejor
            </p>
            <div className="flex flex-col w-[60%] md:w-auto gap-y-4 md:flex-row md:gap-x-4 md:min-w-[35rem]">
              <Link href="/">
                <a className="bg-secundary text-white font-bold py-1 px-4 rounded text-center basis-2/4 py-2">
                  Iniciar Sesión
                </a>
              </Link>
              <Link href="/">
                <a className="bg-secundary text-white font-bold py-1 px-4 rounded text-center basis-2/4 py-2">
                  Regístrate
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
