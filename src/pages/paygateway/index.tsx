import CreditCard from "../../components/PayGateWay/CreditCard";
import Item from "../../components/PayGateWay/Item";
import Account from "@components/PayGateWay/Account";
import Login from "@components/PayGateWay/Login";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DEFAULT_USER_IMAGE from "@public/defaul_user.png";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const PayGateway: NextPage = () => {
  const router = useRouter();
  const product = router.query;
  const [component, setComponent] = useState<number>(0);
  console.log(product);
  let tot =
    typeof product.amount === "string"
      ? typeof product.num === "string"
        ? parseInt(product.amount) * parseInt(product.num)
        : parseInt(product.amount)
      : 0;
  const tax: number =
    product.tax && typeof product.tax === "string" ? parseInt(product.tax) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto">
      <div className="grid md:grid-cols-2 w-full min-h-screen divide-x">
        <div className="p-10 py-20 min-h-screen flex justify-center">
          <div className="w-full md:w-8/12">
            {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
              <Image
                className="rounded w-[18em] h-96"
                src={
                  typeof product.logotype === "string"
                    ? product.logotype
                    : DEFAULT_USER_IMAGE
                }
                alt="preview image"
                width={100}
                height={50}
              />
              <section className="divide-y">
                <div className="max-h-96 overflow-auto">
                  {product.name !== undefined &&
                    typeof product.name !== "string" &&
                    product.name.map((element, index) => {
                      const num = product.num
                        ? parseInt(product.num[index])
                        : 1;
                      const amount = product.amount
                        ? parseInt(product.amount[index])
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
                        amount={parseInt(product.amount)}
                      />
                    )}
                </div>
                <div className="mx-6 pt-6 pb-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 font-montserrat">
                      Subtotal
                    </p>
                    <p className="text-lg text-gray-500  font-montserrat">
                      ${tot}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 font-montserrat">
                      Cargos adicionales
                    </p>
                    <p className="text-lg text-gray-500  font-montserrat">
                      ${tax}
                    </p>
                  </div>
                </div>
                <div className="mx-6 pt-6 flex justify-between items-center">
                  <p className="text-xl font-montserrat">Total</p>
                  <p className="text-xl font-montserrat">${tot + tax}</p>
                </div>
              </section>
          </div>
        </div>
        <div className="flex justify-center items-center p-10">
          {component === 0 && (
            <CreditCard num={tot + tax} setComponent={setComponent} />
          )}
          {component === 1 && <Login setComponent={setComponent} />}
          {component === 2 && <Account num={tot + tax} />}
        </div>
      </div>
    </div>
  );
};

export default PayGateway;