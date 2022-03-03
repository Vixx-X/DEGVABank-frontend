import Footer from "@components/Globals/Layout/Footer";
import Header from "@components/Globals/Layout/Header/Basic";
import CodeFormatter from "@components/PayGateWay/CodeFormatter";
import { SERVER_URLS } from "@config";
import { Listbox, Transition } from "@headlessui/react";
import LoginCapture from "@public/LoginCapture.png";
import PayWayButton from "@public/PayWayButton.png";
import RegisterCapture from "@public/RegisterCapture.png";
import FormPayWay from "@public/formpayway.png";
import KeyGenerate from "@public/keys.png";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const { URL_LOGIN, URL_REGISTER, URL_USER_PAYWAY_APPS } = SERVER_URLS;

const Documentation: NextPage = () => {
  const [selectedSnippet, setSelectedSnippet] = useState("javascript");
  const snippets = useMemo<{ [key: string]: string }>(() => {
    return {
      javascript: `
// In javascript you could use the fernet package
// See more at: https://www.npmjs.com/package/fernet

const SECRET_KEY = "<your-secret-key>";
const secret = new fernet.Secret(SECRET_KEY);

function decrypt(msg) {
  const token = new fernet.Token({
    secret: secret,
    token: msg, // <- string
    ttl: 0
  });
  return token.decode();
}`,
      kotlin: `
// In kotlin you could use the fernet-java8 package
// See more at: https://github.com/l0s/fernet-java8

public static class Decrypter {
  // SECRET_KEY = "<your-secret-key>";
  private static Key key = new Key(SECRET_KEY);

  public static string decrypt(final String msg) {
    final Token token = Token.fromString(msg);
    final Validator<String> validator = new StringValidator() {
    };
    return token.validateAndDecrypt(key, validator);
  }
}`,
      python: `
# In python you could use the cryptography module
# See more at: https://cryptography.io/en/latest/fernet/

from cryptography.fernet import Fernet

SECRET_KEY = "<your-secret-key>"
secret = Fernet(key.encode("utf8"))

def decrypt(msg):
    return secret.decrypt(msg.encode("utf8")).decode("utf8")`,
    };
  }, []);

  const snippetsChoices = useMemo(() => Object.keys(snippets), [snippets]);
  return (
    <>
      <div className="flex flex-col">
        <Header />
      </div>
      <main className="xl:w-[70rem] max-w-[90%] mx-auto py-8">
        <h1 className="text-center text-xl font-bold uppercase text-darkprimary">
          Documentación de la pasarela
        </h1>
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
            <div className="my-4 max-w-full">
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
            <div className="my-4 max-w-full w-80">
              <Image src={LoginCapture} alt="login image" />
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
            <div className="my-4 max-w-full w-36">
              <Image src={PayWayButton} alt="button payway" />
            </div>
          </li>
          <li className="my-2">
            Completar el formulario que te aparezca.
            <div className="my-4 max-w-full w-[35rem] border border-gray">
              <Image src={FormPayWay} alt="preview image" />
            </div>
            <ul className="list-disc my-2">
              <li className="ml-6">
                Ingresar un identificador único para esa pasarela de pago
              </li>
              <li className="ml-6">Ingresar el nombre de tu aplicación</li>
              <li className="ml-6">
                Seleccionar una cuenta bancaria, en donde se depositarán todos
                los fondos para esa pasarela
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
          <div className="my-4 max-w-full w-80 border border-gray">
            <Image src={KeyGenerate} alt="preview image" />
          </div>

          <li className="my-2">
            Dentro de la aplicación pasar como <code>query-params</code> el
            producto o la lista de productos asociados que se quieran facturar a
            través de la pasarela.
            <ul className="list-disc my-2">
              <li className="ml-6 my-4">
                Parametros obligatorios generales que debe incluir
                <ul className="list-disc my-1">
                  <li className="ml-6">
                    <code className="bg-gray-100">key:</code> deberá suministrar
                    la clave pública asociada a su pasarela
                  </li>
                  <li className="ml-6">
                    <code className="bg-gray-100">order:</code> deberá
                    suministrar la orden asociada a la compra en cuestión
                  </li>
                  <li className="ml-6">
                    <code className="bg-gray-100">reason:</code> deberá
                    suministrar el motivo de compra.
                  </li>
                </ul>
              </li>
              <li className="ml-6 my-4">
                Parametros opcionales generales que puede incluir
                <ul className="list-disc my-1">
                  <li className="ml-6">
                    <code className="bg-gray-100">tax:</code> si existe un
                    impuesto general de la compra que se deba incluir
                  </li>
                  <li className="ml-6">
                    <code className="bg-gray-100">logotype:</code> imagen
                    asociada al logotipo de su aplicación.
                  </li>
                </ul>
              </li>
              <li className="ml-6 my-4">
                Por producto se tienen los siguientes datos:
                <ul className="list-disc my-1">
                  <li className="ml-6">
                    <code className="bg-gray-100">name:</code> nombre de
                    producto
                  </li>
                  <li className="ml-6">
                    <code className="bg-gray-100">image:</code> imagen asociada
                    al producto
                  </li>
                  <li className="ml-6">
                    <code className="bg-gray-100">amount:</code> precio del
                    producto por unidad
                  </li>
                  <li className="ml-6">
                    <code className="bg-gray-100">num:</code> cantidad de
                    unidades a comprar de ese producto
                  </li>
                </ul>
                <p className="my-4">
                  Es importante acotar que de ser una lista de productos deben
                  suministrarse todos los <code>query-params</code> de un
                  producto antes de pasar a definir los{" "}
                  <code>query-params</code> de un siguiente producto. Si un
                  producto no posee alguno de los <code>query-params</code>{" "}
                  antes señalados, es necesario de todas maneras incluirlo, solo
                  que sin colocarle el valor para no perturbar la asociación de
                  cada producto con sus correspondientes atributos.
                </p>
                <p className="my-4">
                  Los parametros <code>name</code> y <code>amount</code> son
                  obligatorios por producto.
                </p>
                <p className="my-4">Ejemplo:</p>
                <p className="my-4">
                  <code className="bg-gray-100">
                    ?name=producto1&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=80&num=5&name=producto2&image=&amount=90&num=2
                  </code>
                </p>
              </li>
            </ul>
            <div className="my-4">
              <p className="my-2 text-darkprimary">
                Ejemplo de <code>query-params</code> completo válido
              </p>
              <code className="bg-gray-100">
                ?name=producto1&image=https://sc04.alicdn.com/kf/Uc0b56e875b04467aa767dda132693ee5V.jpg&amount=80&num=5&tax=5&logotype=https://upload.wikimedia.org/wikipedia/commons/9/9b/Zortrax-logotype.svg&order=001&key=VphD_VwHLWU27VioQYOIByBnamY4wa-G8oEKDVs8kW3E&reason=prueba
              </code>
            </div>
          </li>
          <li className="my-2">
            En el endpoint que especificaste como url de backend, deberá recibir
            un POST de texto, el cual viene encriptado bajo la especificación de{" "}
            <Link href="https://github.com/fernet/spec/blob/master/Spec.md">
              <a
                target="_blank"
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                Fernet
              </a>
            </Link>
            , usando su clave privada, para lo cual tendrá que desencriptar en
            su server, para así poder acceder al contenido. Aquí podrán
            visualizar algunas de las posibles formas de desencriptar de acuerdo
            al lenguaje:
            <div className="w-full h-full relative">
              <div className="w-[90%] absolute left-[5%] flex flex-end">
                <div className="absolute w-48 right-2 top-2">
                  <Listbox
                    value={selectedSnippet}
                    onChange={setSelectedSnippet}
                  >
                    <Listbox.Button className="w-full absolute py-2 pl-3 pr-10 text-left bg-white rounded shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      <span className="block truncate">{selectedSnippet}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        ^
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {snippetsChoices.map((choice, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-amber-900 bg-amber-100"
                                  : "text-gray-900"
                              }`
                            }
                            value={choice}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {choice}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    {"✓ "}
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </Listbox>
                </div>
              </div>
              <div className="h-96">
                <CodeFormatter language={selectedSnippet} style={a11yDark}>
                  {snippets[selectedSnippet]}
                </CodeFormatter>
              </div>
            </div>
            <p className="my-4">
              Si pudes leer el siguiente mensaje, lo tienes bien configurado:
            </p>
            <CodeFormatter language="json" style={a11yDark}>
              {`// key: bbbbbbb
aaaaaaaaaaaaaaaaaa`}
            </CodeFormatter>
          </li>

          <li className="my-2">
            El contenido del payload resultante es un string que posee dentro
            JSON, dicho string deserializado en JSON tendrá una estructura tal
            que:
            <CodeFormatter language="json" style={a11yDark}>
              {`{
  "order": "number",
  "reason": "string",
  "amount": "string",
  "status": "APPROVED|DENIED",
}`}
            </CodeFormatter>
            Con el cual podrás procesar o no tu orden.
          </li>
          <li className="my-2">
            Y listo, así se completaría el setup de la pasarela de pagos con
            DEGVA-Bank, {"<slogan>"}. Cualquier duda o error contactar a{" "}
            {"<contacto>"}.
          </li>
        </ol>
      </main>
      <Footer />
    </>
  );
};

export default Documentation;
