import CalendarButton from "@components/Globals/CalentarButton";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import SearchBar from "@components/Globals/SearchBar";
import DataTable from "@components/Transaction/DataTable";
import { API_URLS } from "@config";
import { getTransactionWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
// import { SERVER_URLS } from "@config";
import type { NextPage } from "next";
import { useState, useEffect } from "react";

const { URL_USER_TRANSACTIONS } = API_URLS;

const HEADERS = [
  { name: "id", value: "id" },
  { name: "source", value: "source" },
  { name: "target", value: "target" },
  { name: "amount", value: "amount" },
  { name: "reason", value: "reason" },
  { name: "Fecha", value: "date" },
];
// const ITEMS_DATA_TABLE = [
//   {
//     idTransaction: 0,
//     sender: "User1",
//     amount: 10,
//     reason: "Razon 1",
//     date: "00/00/0000",
//   },
//   {
//     idTransaction: 1,
//     sender: "User2",
//     amount: 300,
//     reason: "Razon 2",
//     date: "00/00/0000",
//   },
//   {
//     idTransaction: 2,
//     sender: "User3",
//     amount: 200,
//     reason: "Razon 3",
//     date: "00/00/0000",
//   },
// ];

const Transaction: NextPage = () => {
  const [calendarButton1, setCalendarButton1] = useState("");
  const [calendarButton2, setCalendarButton2] = useState("");

  const handleCalendarButton1 = (date: string) => {
    setCalendarButton1(date);
  };
  const handleCalendarButton2 = (date: string) => {
    setCalendarButton2(date);
  };
  const handleSubmitSearchBar = (data: string) => {
    console.log("Voy a buscar ", data);
  };

  const { data } = useSWRAuth(URL_USER_TRANSACTIONS, getTransactionWithURL);
  useEffect(() => {
    if (calendarButton1 !== "" && calendarButton2 !== "") {
      console.log("Tengo 2 fechas seleccionadas");
    }
  }, [calendarButton1, calendarButton2]);

  return (
    <MainLayout activate="movements">
      <div className="flex justify-between">
        <div className="flex">
          <div className="mx-2">
            <CalendarButton onchange={handleCalendarButton1} />
          </div>
          <div className="mx-2">
            <CalendarButton onchange={handleCalendarButton2} />
          </div>
        </div>
        <SearchBar onsubmit={handleSubmitSearchBar} />
      </div>
      <div className="flex justify-center">
        {data && data.results.lenght > 0 ? (
          <DataTable headers={HEADERS} items={data.results} />
        ) : (
          <p> No hay movimientos.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Transaction;
