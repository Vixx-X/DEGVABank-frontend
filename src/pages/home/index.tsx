import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import CardBill from "@components/Home/Card/bill";
import CreditCard from "@components/Home/Card/credit-card";
import { API_URLS } from "@config";
import { getAccountDataWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
//import Button from "@components/Button/Button";
import type { NextPage } from "next";

const { URL_GET_ACCOUNT, URL_GET_CREDIT_CARDS } = API_URLS;

const Home: NextPage = () => {
  const dataAccounts = useSWRAuth(URL_GET_ACCOUNT, getAccountDataWithURL);
  const dataCards = useSWRAuth(URL_GET_CREDIT_CARDS, getAccountDataWithURL)
  console.log("Tengo data de accounts", dataAccounts);
  console.log("Tengo tarjeta de credito", dataCards);
  return (
    <MainLayout>
      <div className="flex flex-wrap justify-between">
        <main className="basis-full md:basis-9/12 divide-y flex flex-col gap-y-12">
          {dataAccounts.data?.results ? (
            <CardBill ITEMS_BILLS={dataAccounts.data.results} />
          ) : (
            <p>Cargando Data</p>
          )}
          { dataCards.data?.results ?(
            <CreditCard ITEMS_CARDS={dataCards.data.results}/>
          )
          :(
            <p>Cargando Data</p>
          )
          }
        </main>
        <aside className="hidden md:block md:basis-[22%] h-96 rounded-2xl border border-indigo-600"></aside>
      </div>
    </MainLayout>
  );
};

export default Home;
