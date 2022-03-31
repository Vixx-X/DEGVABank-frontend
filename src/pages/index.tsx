import Footer from "@components/Globals/Layout/Footer";
import Header from "@components/Globals/Layout/Header/Basic";
import Logotype from "@components/Globals/Logotype";
import CardAbout from "@components/Landing/CardAbout";
import { SERVER_URLS } from "@config";
import { GroupSvg, LockSvg, SpeedSvg } from "@public/assets/imagesSvg";
import type { NextPage } from "next";
import Link from "next/link";

const { URL_LOGIN, URL_REGISTER, URL_DOCUMENTATION } = SERVER_URLS;

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-[40rem] xl:h-screen">
        <Header />
        <div className="md:bg-[url('../public/backgroundPage.png')] bg-[url('../public/backgroundPage3.jpg')] bg-cover bg-center grow relative">
          <div className="absolute grow bg-black/60 w-full h-full">
            <div className="max-w-[90%] mx-auto h-full flex items-center md:justify-center">
              <div>
                <div className="mt-[-4rem] mb-[4rem] lg:mb-[8rem]">
                  <Logotype
                    classnameBox="h-16 lg:h-20 xl:h-24 md:justify-center"
                    sizeTitle="text-4xl lg:text-5xl xl:text-7xl"
                    sizeSubTitle="text-xl lg:text-2xl xl:text-4xl"
                    mode="light"
                  />
                </div>
                <section className="hidden md:flex xl:w-[70rem] max-w-[90%] mx-auto justify-between">
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
                      <Link href={URL_LOGIN}>
                        <a className="bg-primary hover:bg-blue-700 text-light font-bold py-2 px-4 cursor-pointer rounded-full w-full uppercase text-center transition">
                          Iniciar Sesión
                        </a>
                      </Link>
                      <Link href={URL_REGISTER}>
                        <a className="bg-light hover:bg-slate-50  text-dark font-bold rounded-full py-2 px-4 cursor-pointer uppercase text-center transition">
                          Regístrate
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="basis-2/5 flex flex-col text-center gap-y-4 transition-opacity">
                    {/* opacity-0 hover:opacity-100 */}
                    <h4 className="text-light text-3xl text-shadow">
                      Persona Jurídica
                    </h4>
                    <p className="text-light text-center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam quasi fugiat et reiciendis est.
                    </p>
                    <div className="flex flex-col gap-y-4">
                      <Link href={URL_LOGIN}>
                        <a className="bg-primary hover:bg-blue-700 text-light font-bold py-2 px-4 cursor-pointer rounded-full w-full uppercase text-center transition">
                          Iniciar Sesión
                        </a>
                      </Link>
                      <Link href={URL_REGISTER}>
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
        </div>
      </div>
      <section className="flex flex-col gap-y-16 justify-center my-16">
        <CardAbout
          image={<GroupSvg />}
          title="Sobre Nosotros"
          imageFirst={true}
          color="primary"
        >
          <>
            Degva Banck ofrece a sus clientes particulares y jurídicos su banca
            en línea con toda la información sobre, tarjetas de crédito,
            cuentas.
          </>
        </CardAbout>
        <CardAbout
          image={<LockSvg />}
          title="Mayor Seguridad"
          imageFirst={false}
          color="secundary"
        >
          <>
            Nuestra plataforma es sumamente confiable, tenemos sistemas de
            seguridad que garantizan la integridad, la autenticidad,
            confidencialidad y disponibilidad para todos nuestros usuarios en
            toda la transaccionalidad y funcionalidades que ofrecemos.
          </>
        </CardAbout>
        <CardAbout
          image={<SpeedSvg />}
          title="Mayor Rapidez"
          imageFirst={true}
          color="primary"
        >
          <>
            Haz operaciones de manera rápida y sencilla, transferencias
            instantáneas entre usuarios de nuestro mismo banco y otras
            entidades. El tiempo de respuesta a tus solictudes en nuestro banco
            cada vez es más corto gracias a nuestro equipo altamente capacitado.
          </>
        </CardAbout>
      </section>
      <section className="bg-[url('../public/backgroundPage2.png')] bg-cover bg-center h-[30rem] relative">
        <div className="absolute bg-black/60 w-full h-[25rem] top-10">
          <div className="flex grow flex-col items-center justify-center gap-y-6 h-full max-w-[90%] mx-auto text-center">
            <h4 className="text-light text-3xl text-shadow">
              ¿Quieres incorporar nuestro banco a tu comercio?
            </h4>
            <p className="text-light text-2xl">
              Aqui puedes obtener informacion sobre nuestra pasarela de pagos
            </p>
            <div className="flex flex-col justify-center w-[60%] md:w-auto gap-y-4 md:flex-row md:gap-x-4 md:min-w-[35rem]">
              <Link href={URL_DOCUMENTATION}>
                <a className="bg-secundary text-white font-bold py-1 px-4 rounded text-center basis-2/4 py-2">
                  Documentacion
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
