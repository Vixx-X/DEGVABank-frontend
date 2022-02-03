import type { NextPage } from "next";
//import Button from "@components/Button/Button";
import Header from "@components/Header/Advanced";
import Footer from "@components/Footer";
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

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="grow relative">
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
