import DataTable from "@components/Transaction/DataTable";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
// import { SERVER_URLS } from "@config";
import type { NextPage } from "next";

// const { URL_LOGIN, URL_REGISTER } = SERVER_URLS;

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
    amount: 10,
    reason: "Razon 1",
    date: "00/00/0000",
  },
  {
    idTransaction: 1,
    sender: "User2",
    amount: 300,
    reason: "Razon 2",
    date: "00/00/0000",
  },
  {
    idTransaction: 2,
    sender: "User3",
    amount: 200,
    reason: "Razon 3",
    date: "00/00/0000",
  },
];

const Transaction: NextPage = () => {
  return (
    <MainLayout activate="movements">
      <div className="flex justify-center">
        <DataTable headers={HEADERS} items={ITEMS_DATA_TABLE} />
      </div>
    </MainLayout>
  );
};

export default Transaction;
