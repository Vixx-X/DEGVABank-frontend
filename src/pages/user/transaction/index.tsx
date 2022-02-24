import CalendarButton from "@components/Globals/CalentarButton";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import SearchBar from "@components/Globals/SearchBar";
import DataTable from "@components/Transaction/DataTable";
import { API_URLS } from "@config";
import { getTransactionWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { makeUrl } from "@utils/makeUrl";
// import { SERVER_URLS } from "@config";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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

const Transaction: NextPage = () => {
  const router = useRouter();

  const [calendarButton1, setCalendarButton1] = useState("");
  const [calendarButton2, setCalendarButton2] = useState("");
  const [paramsURL, setparamsURL] = useState({});

  const handleCalendarButton1 = (date: string) => {
    setCalendarButton1(date);
  };
  const handleCalendarButton2 = (date: string) => {
    setCalendarButton2(date);
  };
  const handleSubmitSearchBar = (data: string) => {
    alert(`Data a buscar: ${data}`)
    console.log("Voy a buscar ", data);
  };
  const handleOrderClick = (attr:string) => {
    setparamsURL({
      ordering:attr
    })
  };

  const { data } = useSWRAuth(makeUrl(URL_USER_TRANSACTIONS,paramsURL), getTransactionWithURL);
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
        {data?.results && data.results.length > 0 ? (
          <DataTable
            handleOrderClick={handleOrderClick}
            headers={HEADERS}
            items={data.results}
          />
        ) : (
          <p> No hay movimientos.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Transaction;
