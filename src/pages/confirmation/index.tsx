import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import ConfirmTrasaction from "@components/Transaction/ConfirmTransaction";
import type { NextPage } from "next";

const headers = [
    "Nombre del beneficiario",
    "Numero de telefono",
    "Numero de Cedula de Beneficiario",
    "Banco Destino",
    "Monto",
    "Concepto",
  ];
  const values = [
    "Eduardo",
    "0424-2765180",
    "25641651",
    "DEGVA BANK",
    "100.00",
    "Pago intereses casa",
  ];

const test: NextPage = () => {
  return (
    <MainLayout>
      <ConfirmTrasaction
        headers={headers}
        value={values}
        ></ConfirmTrasaction>
    </MainLayout>
  );
};

export default test;
