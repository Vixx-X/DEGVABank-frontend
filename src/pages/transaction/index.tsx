import DataTable from "@components/DataTable";
import Footer from "@components/Footer";
import Header from "@components/Header/Basic";
import { SERVER_URLS } from "@config";
import type { NextPage } from "next";

const { URL_LOGIN, URL_REGISTER } = SERVER_URLS;

const HEADERS = [
  { name: "Id Trasaccion", value: "idTransaction" },
  { name: "Emisor", value: "sender" },
  { name: "Monto", value: "amount" },
  { name: "Motivo", value: "reason" },
  { name: "Fecha", value: "date" },
];
const ITEMS_DATA_TABLE = [
  {
    idTransaction: 0,
    sender: "User1",
    amount: 100,
    reason: "Razon 1",
    date: "00/00/0000",
  },
  {
    idTransaction: 1,
    sender: "User2",
    amount: 100,
    reason: "Razon 2",
    date: "00/00/0000",
  },
  {
    idTransaction: 2,
    sender: "User3",
    amount: 100,
    reason: "Razon 3",
    date: "00/00/0000",
  },
];

const Transaction: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-[40rem] xl:h-screen">
        <Header />
        <div className="grow relative">
          <div className="flex justify-center">
            <DataTable headers={HEADERS} items={ITEMS_DATA_TABLE} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transaction;
