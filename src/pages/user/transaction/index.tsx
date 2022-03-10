import Button from "@components/Globals/Button/Button";
import CalendarButton from "@components/Globals/CalentarButton";
import DataTable from "@components/Globals/DataTable";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import SearchBar from "@components/Globals/SearchBar";
import { API_URLS } from "@config";
import { getTransactionWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { makeUrl } from "@utils/makeUrl";
import type { NextPage } from "next";
import Link from "next/link";
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
  const [calendarButton1, setCalendarButton1] = useState("");
  const [calendarButton2, setCalendarButton2] = useState("");
  const [paramsURL, setparamsURL] = useState({} as any);

  const router = useRouter();
  const page = parseInt((router?.query?.page as string) ?? 1, 10);

  console.log("Page", page);

  const handleCalendarButton1 = (date: string) => {
    setCalendarButton1(date);
  };
  const handleCalendarButton2 = (date: string) => {
    setCalendarButton2(date);
  };
  const handleSubmitSearchBar = (data: string) => {
    console.log("Voy a buscar ", data);
    setparamsURL({
      search: data,
    });
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
    makeUrl(URL_USER_TRANSACTIONS, { ...paramsURL, offset: (page - 1) * 10 }),
    getTransactionWithURL
  );

  useEffect(() => {
    if (calendarButton1 !== "" && calendarButton2 !== "") {
      console.log("1", calendarButton1);
      console.log("2", calendarButton2);
      setparamsURL({
        min_date: calendarButton1,
        max_date: calendarButton2,
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
          <div className="w-full">
            <DataTable
              headers={HEADERS}
              items={data.results}
              handleOrderClick={handleOrderClick}
            />
            <div className="mt-3 w-full flex justify-end gap-2">
              {page > 1 && (
                <div className="justify-self-start">
                  <Link passHref href={`?page=${page - 1}`}>
                    <Button>Anterior</Button>
                  </Link>
                </div>
              )}
              {page < data.count / 10 && (
                <div className="justify-self-end">
                  <Link passHref href={`?page=${page + 1}`}>
                    <Button>Siguiente</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p> No hay movimientos.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Transaction;
