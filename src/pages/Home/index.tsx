import type { NextPage } from "next";
//import Button from "@components/Button/Button";
import Header from "@components/Header/Advanced";
import Footer from "@components/Footer";
import CardBill from "./Card/Bill";
import CreditCard from "./Card/CreditCard";
//import { Formik, Form, Field, FormikHelpers } from "formik";
//import * as Yup from "yup";
//import Link from "next/link";

// interface SigninForm {
//   password: string;
//   userName: string;
// }

// const SigninSchema = Yup.object().shape({
//   userName: Yup.string()
//     .min(2, "Too Short!")
//     .max(70, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
// });

const arrayBills = [
  {
    id: "013400000000002091933",
    tipo: "Ahorro",
    saldo: 32.7,
    fecha: new Date(),
  },
  {
    id: "013400000000002091934",
    tipo: "Ahorro",
    saldo: 0.0,
    fecha: new Date(),
  },
  {
    id: "013400000000002091933",
    tipo: "Ahorro",
    saldo: 32.7,
    fecha: new Date(),
  },
  {
    id: "013400005500002091933",
    tipo: "Corriente",
    saldo: 17.7,
    fecha: new Date(),
  },
];

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="grow relative">
          <div className=" xl:w-[70rem] max-w-[90%] flex flex-wrap mx-auto my-20 justify-between">
            <main className="basis-full md:basis-9/12 divide-y flex flex-col gap-y-12">
              <CardBill />
              <CreditCard />
            </main>
            <aside className="hidden md:block md:basis-[22%] bg-primary">
                
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;