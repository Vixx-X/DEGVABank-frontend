import Footer from "@components/Globals/Layout/Footer";
import Header from "@components/Globals/Layout/Header/Basic";

const MainLayout = (props: { children: any }) => {
  const { children } = props;
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="bg-[url('../public/backgroundPage2.png')] bg-cover bg-center grow relative">
        <div className="absolute grow bg-black/60 w-full h-full"></div>
        <div className="z-1 relative grid place-items-center mx-auto w-full h-full">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
