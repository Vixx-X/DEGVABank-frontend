import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import SideBar from "@components/Globals/Layout/Sidebar";
import Loading from "@components/Globals/Loading";
import Logotype from "@components/Globals/Logotype";
import CreditCard from "@components/Home/Card/CreditCard";
import CardBill from "@components/Home/Card/bill";
import { API_URLS } from "@config";
import { getAccountDataWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
//import Button from "@components/Button/Button";
import type { NextPage } from "next";

const { URL_USER_ACCOUNTS, URL_USER_CREDIT_CARDS } = API_URLS;

const Home: NextPage = () => {
  const dataAccounts = useSWRAuth(URL_USER_ACCOUNTS, getAccountDataWithURL);
  const dataCards = useSWRAuth(URL_USER_CREDIT_CARDS, getAccountDataWithURL);
  return (
    <MainLayout>
      {!dataAccounts.data?.results || !dataCards.data?.results ? (
        <Loading />
      ) : (
        <>
          <h1 className="flex justify-center md:hidden flex-col text-2xl text-center text-darkprimary uppercase italic md:text-left">
            <span className="mb-2">Bienvenidos a</span>
            <Logotype
              classnameBox={"flex justify-center md:justify-start h-16"}
            />
          </h1>

          <div className="flex flex-col md:flex-row gap-y-4 mt-4 justify-between">
            <main className="basis-full lg:basis-9/12 divide-y flex flex-col gap-y-12">
              <CardBill ITEMS_BILLS={dataAccounts.data.results} />
              <CreditCard
                cards={dataCards.data.results}
                accounts={dataAccounts.data.results}
              />
            </main>
            <aside className="lg:basis-[22%]">
              <SideBar />
            </aside>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Home;
