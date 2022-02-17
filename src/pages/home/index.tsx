import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import SideBar from "@components/Globals/Layout/Sidebar";
import Loading from "@components/Globals/Loading";
import CardBill from "@components/Home/Card/bill";
import CreditCard from "@components/Home/Card/credit-card";
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
        <div className="flex justify-between">
          <main className="basis-full lg:basis-9/12 divide-y flex flex-col gap-y-12">
            <CardBill ITEMS_BILLS={dataAccounts.data.results} />
            <CreditCard ITEMS_CARDS={dataCards.data.results} />
          </main>
          <aside className="hidden lg:block lg:basis-[22%]">
            <SideBar />
          </aside>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
