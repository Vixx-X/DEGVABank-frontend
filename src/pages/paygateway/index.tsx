import CreditCard from "@components/PayGateWay/CreditCard";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DEFAULT_USER_IMAGE from "@public/defaul_user.png";
import type { NextPage } from "next";
import Image from "next/image";

interface PayGateway {
  email: "";
  cardInfo: {
    number: 0;
    expirationDate: "";
    cvc: "";
  };
  nameOnCard: "";
}

const INPUT = {
  nameProduct: "Eduardo´s Product",
  amount: "$150",
  imageUrl: DEFAULT_USER_IMAGE,
};

const PayGateway: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center mx-auto w-[90%]">
      <div className="flex justify-between divide-x w-full">
        <div className="w-1/2 py-10">
            <FontAwesomeIcon icon={faArrowLeft} />
          <div className="py-5">
            <p className="text-xl">{INPUT.nameProduct}</p>
            <p className="text-4xl font-semibold tracking-wider">
              {INPUT.amount}
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              className="rounded w-[18em]"
              src={INPUT.imageUrl.src}
              alt="preview image"
              width={250}
              height={250}
            />
          </div>
        </div>
        <div className="w-1/2 flex justify-center p-10">
          <CreditCard amount={INPUT.amount} />
        </div>
      </div>
    </div>
  );
};

export default PayGateway;
