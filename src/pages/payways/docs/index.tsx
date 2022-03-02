import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import CodeFormatter from "@components/PayGateWay/CodeFormatter";
import { SERVER_URLS } from "@config";
import LoginCapture from "@public/LoginCapture.png";
import PayWayButton from "@public/PayWayButton.png";
import RegisterCapture from "@public/RegisterCapture.png";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const { URL_LOGIN, URL_REGISTER, URL_USER_PAYWAY_APPS } = SERVER_URLS;

const Documentation: NextPage = () => {
  return (
    <MainLayout activate="">
      <ol className="px-4 list-decimal font-montserrat">
        <li className="my-2">
          <span className="block">
            <Link href={URL_REGISTER}>
              <a className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
                Registrarse
              </a>
            </Link>{" "}
            con una cuenta de usuario jurídico.
          </span>
          <div className="my-4">
            <Image
              src={RegisterCapture}
              alt="preview image"
              width={350}
              height={100}
            />
          </div>
        </li>

        <li className="my-2">
          <Link href={URL_LOGIN}>
            <a className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
              Iniciar sesión
            </a>
          </Link>{" "}
          con la cuenta de usuario jurídico registrada.
          <div className="my-4">
            <Image
              src={LoginCapture}
              alt="preview image"
              width={300}
              height={320}
            />
          </div>
        </li>
        <li className="my-2">
          Dirigirse a la sección de{" "}
          <Link href={URL_USER_PAYWAY_APPS}>
            <a className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
              Pasarelas Activas
            </a>
          </Link>{" "}
          y hacer click en el boton de &quot;Crear pasarela&quot;.
          <div className="my-4">
            <Image
              src={PayWayButton}
              alt="preview image"
              width={150}
              height={50}
            />
          </div>
        </li>
        <li className="my-2">
          Completar el formulario que te aparezca.
          <ul className="list-disc my-2">
            <li className="ml-6">
              Ingresar un nombre único para esa pasarela de pago
            </li>
            <li className="ml-6">
              Seleccionar una cuenta bancaria, en donde se depositarán todos los
              fondos para esa pasarela
            </li>
            <li className="ml-6">
              Ingresar un URL de Backend para recibir un POST por parte del
              Server
            </li>
            <li className="ml-6">
              Ingresar un URL para redireccionar al cliente en caso exitoso.
            </li>
            <li className="ml-6">
              Ingresar un URL para redireccionar al cliente en caso fallido.
            </li>
          </ul>
        </li>
        <li className="my-2">
          Generar una clave pública y privada dentro de la misma página y
          utilizar esas claves dentro de su aplicación.
        </li>
        <li className="my-2">
          Dentro de la aplicación pasar como query-params el producto o la lista
          de productos asociados que se quieran facturar a través de la
          pasarela.
        </li>
      </ol>
      <CodeFormatter language="javascript" style={a11yDark}>
        {`//Example Javascript 
console.log("Hello world!");
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}`}
      </CodeFormatter>

      <br />
      <CodeFormatter language="kotlin" style={a11yDark}>
        {`// Example Kotlin
fun main(args : Array<String>) {
  println("Hello, World!")
}`}
      </CodeFormatter>
      <br />
      <CodeFormatter language="python" style={a11yDark}>
        {`# Example Python
x = 1
if x == 1:
  # indented four spaces
  print("x is 1.")
  print("Hello World")`}
      </CodeFormatter>
    </MainLayout>
  );
};

export default Documentation;
