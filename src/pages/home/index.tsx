import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import CardBill from "@components/Home/Card/bill";
import CreditCard from "@components/Home/Card/credit-card";
//import Button from "@components/Button/Button";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-wrap justify-between">
        <main className="basis-full md:basis-9/12 divide-y flex flex-col gap-y-12">
          <CardBill />
          <CreditCard />
        </main>
        <aside className="hidden md:block md:basis-[22%] h-96 rounded-2xl border border-indigo-600"></aside>
      </div>
    </MainLayout>
  );
};

export default Home;
