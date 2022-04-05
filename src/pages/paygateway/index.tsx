import CreditCard from "../../components/PayGateWay/CreditCard";
import Item from "../../components/PayGateWay/Item";
import Account from "@components/PayGateWay/Account";
import CountdownTimer from "@components/PayGateWay/CountDownTimer";
import Login from "@components/PayGateWay/Login";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DEFAULT_USER_IMAGE from "@public/defaul_user.png";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const PayGateway: NextPage = () => {
  const router = useRouter();
  const product = router.query;
  const [component, setComponent] = useState<number>(0);
  let tot =
    typeof product.amount === "string"
      ? typeof product.num === "string"
        ? parseFloat(product.amount) * parseInt(product.num)
        : parseFloat(product.amount)
      : 0;
  const order: string =
    product.order && typeof product.order === "string" ? product.order : "";
  const tax: number =
    product.tax && typeof product.tax === "string"
      ? parseFloat(product.tax)
      : 0;
  const publicKey: string =
    product.key && typeof product.key === "string" ? product.key : "";
  const reason: string =
    product.reason && typeof product.reason === "string" ? product.reason : "";

  const timer: number =
    product.timer && typeof product.timer === "string"
      ? parseFloat(product.timer)
      : 0;

  const minutes: number = Math.floor(timer);
  const seconds: number = (timer - minutes) * 100;

  const TIME_LEFT = (minutes * 60 + seconds) * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + TIME_LEFT;

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto">
      <div className="grid md:grid-cols-2 w-full min-h-screen divide-x">
        <div className="p-10 py-20 min-h-screen flex justify-center">
          <div className="w-full w-full xl:w-9/12">
            <button onClick={() => history.back()}>
              <FontAwesomeIcon icon={faArrowLeft} size="2x" color="grey" />
            </button>
            <div className="relative w-40 h-10 my-8">
              <Image
                src={
                  typeof product.logotype === "string"
                    ? product.logotype
                    : DEFAULT_USER_IMAGE
                }
                alt="logotypeimage"
                layout={"fill"}
                objectFit={"contain"}
              />
            </div>
            <section className="divide-y">
              <div className="max-h-96 overflow-auto">
                {product.name !== undefined &&
                  typeof product.name !== "string" &&
                  product.name.map((element, index) => {
                    const num = product.num
                      ? parseFloat(product.num[index])
                      : 1;
                    const amount = product.amount
                      ? parseFloat(product.amount[index])
                      : 0;
                    tot += amount * num;
                    return (
                      <Item
                        key={index}
                        name={element}
                        image={product.image && product.image[index]}
                        num={num}
                        amount={amount}
                      />
                    );
                  })}
                {typeof product.name === "string" &&
                  typeof product.image === "string" &&
                  typeof product.num === "string" &&
                  typeof product.amount === "string" && (
                    <Item
                      name={product.name}
                      image={product.image}
                      num={parseInt(product.num)}
                      amount={parseFloat(product.amount)}
                    />
                  )}
              </div>
              <div className="mx-6 pt-6 pb-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-montserrat">
                    Subtotal
                  </p>
                  <p className="text-lg text-gray-500  font-montserrat">
                    ${tot.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-montserrat">
                    Cargos adicionales
                  </p>
                  <p className="text-lg text-gray-500  font-montserrat">
                    ${tax.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mx-6 pt-6 flex justify-between items-center">
                <p className="text-xl font-montserrat">Total</p>
                <p className="text-xl font-montserrat">
                  ${(tot + tax).toFixed(2)}
                </p>
              </div>
            </section>
            <div className="my-4 flex justify-center">
              {timer != 0 && (
                <CountdownTimer
                  targetDate={dateTimeAfterThreeDays}
                  mode="payway"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center p-10">
          {component === 0 && (
            <CreditCard
              amount={`${(tot + tax).toFixed(2)}`}
              order={order}
              publicKey={publicKey}
              reason={reason}
              setComponent={setComponent}
            />
          )}
          {component === 1 && <Login setComponent={setComponent} />}
          {component === 2 && (
            <Account
              order={order}
              amount={`${(tot + tax).toFixed(2)}`}
              publicKey={publicKey}
              reason={reason}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PayGateway;
