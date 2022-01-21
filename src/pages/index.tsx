import Header from "@components/Header";
import Footer from "@components/Footer";
import type { NextPage } from "next";
import Logotype from "@components/Logotype";

const Home: NextPage = () => {
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
