import CalendarButton from "@components/Globals/CalentarButton";
import DataTable from "@components/Globals/DataTable";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import SearchBar from "@components/Globals/SearchBar";
import { API_URLS } from "@config";
import { getTransactionWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { makeUrl } from "@utils/makeUrl";
// import { SERVER_URLS } from "@config";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const { URL_USER_TRANSACTIONS } = API_URLS;

const HEADERS = {
  id: "id",
  target: "target",
  amount: "amount",
  reason: "reason",
  date: "date",
};

const Transaction: NextPage = () => {
  const router = useRouter();

  const [calendarButton1, setCalendarButton1] = useState("");
  const [calendarButton2, setCalendarButton2] = useState("");
  const [paramsURL, setparamsURL] = useState({} as any);

  const handleCalendarButton1 = (date: string) => {
    setCalendarButton1(date);
  };
  const handleCalendarButton2 = (date: string) => {
    setCalendarButton2(date);
  };
  const handleSubmitSearchBar = (data: string) => {
    alert(`Data a buscar: ${data}`);
    console.log("Voy a buscar ", data);
  };
  const handleOrderClick = (attr: string) => {
    console.log("Click en:", attr);

    setparamsURL({
      ordering: attr,
    });

    if (attr === paramsURL.ordering) {
      setparamsURL({
        ordering: "-" + attr,
      });
    }
    if ("-" + attr === paramsURL.ordering) {
      setparamsURL({
        ordering: attr,
      });
    }
  };

  const { data } = useSWRAuth(
    makeUrl(URL_USER_TRANSACTIONS, paramsURL),
    getTransactionWithURL
  );

  useEffect(() => {
    if (calendarButton1 !== "" && calendarButton2 !== "") {
      console.log("1", calendarButton1);
      console.log("2", calendarButton2);
      setparamsURL({
        min_date: calendarButton1,
        // max_date: calendarButton2,
      });
    }
  }, [calendarButton1, calendarButton2]);

  useEffect(() => {
    console.log("return data", data);
  }, [data]);

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
