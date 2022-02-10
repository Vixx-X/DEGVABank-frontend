import CalendarButton from "@components/Globals/CalentarButton";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import SearchBar from "@components/Globals/SearchBar";
import DataTable from "@components/Transaction/DataTable";
// import { SERVER_URLS } from "@config";
import type { NextPage } from "next";
import { useState,useEffect } from "react";

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

  const [calendarButton1,setCalendarButton1] = useState("")
  const [calendarButton2,setCalendarButton2] = useState("")

  const handleCalendarButton1 = (date:string) =>{
    setCalendarButton1(date)
  }
  const handleCalendarButton2 = (date:string) =>{
    setCalendarButton2(date)
  }
  const handleSubmitSearchBar = (data:string) =>{
    console.log("Voy a buscar ",data)
  }

  useEffect(() => {
    if(calendarButton1 !== "" && calendarButton2 !== ""){
      console.log("Tengo 2 fechas seleccionadas")
    }
  }, [calendarButton1,calendarButton2])

  return (
    <MainLayout activate="movements">
      <div className="flex justify-around">
        <div className="flex">
          <div className="mx-2">
            <CalendarButton 
            onchange = {handleCalendarButton1}
            />
          </div>
          <div className="mx-2">
            <CalendarButton
            onchange = {handleCalendarButton2}
            />
          </div>
        </div>
        <SearchBar 
          onsubmit={handleSubmitSearchBar}
        />
      </div>
      <div className="flex justify-center">
        <DataTable headers={HEADERS} items={ITEMS_DATA_TABLE} />
      </div>
    </MainLayout>
  );
};

export default Transaction;
