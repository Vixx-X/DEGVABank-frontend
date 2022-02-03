import CardBill from "./card/bill";
import CreditCard from "./card/credit-card";
import Footer from "@components/Footer";
//import Button from "@components/Button/Button";
import Header from "@components/Header/Advanced";
import { UserContext } from "@contexts/UserContext";
import type { NextPage } from "next";
import { useContext } from "react";

const Home: NextPage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header username={user.username} />
        <div className="grow relative">
          <div className=" xl:w-[70rem] max-w-[90%] flex flex-wrap mx-auto my-20 justify-between">
            <main className="basis-full md:basis-9/12 divide-y flex flex-col gap-y-12">
              <CardBill />
              <CreditCard />
            </main>
            <aside className="hidden md:block md:basis-[22%] h-96 rounded-2xl border border-indigo-600"></aside>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

