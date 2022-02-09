import Footer from "@components/Globals/Layout/Footer";
import Header from "@components/Globals/Layout/Header/Advanced";

const MainLayout = (props: { activate?: string; children: any }) => {
  const { activate, children } = props;
  return (
    <div className="flex flex-col min-h-screen">
      <Header activate={activate} />
      <div className="grow relative">
        <div className="w-[70rem] max-w-[90%] mx-auto my-20">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
