import PayCreditCardForm from "./Form";
import Button from "@components/Globals/Button/Button";
import Modal from "@components/Globals/Modal";
import { useEffect, useState } from "react";

const LIMIT_CARD = 5000;

interface CreditCard {
  id: number;
  number: string;
  security_code: string;
  expiration_date: string;
  credit: string;
  user: number;
}
interface CreditCardProps {
  cards: CreditCard[];
  accounts: any;
}

const CreditCard = ({ cards, accounts }: CreditCardProps) => {
  const [isOpenPayCard, setIsOpenPayCard] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<any>();
  const handleCurrentcurrentCard = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const findcurrentCard = cards.find(
      ({ number }) => e.target.value == number.toString()
    );
    if (findcurrentCard) {
      setCurrentCard(findcurrentCard);
    }
  };
  useEffect(() => {
    if (cards) {
      setCurrentCard(cards[0]);
    }
  }, [cards]);

  return (
    <>
      <div className="rounded-2xl w-full overflow-hidden shadow-lg p-8">
        <label
          className="text-darkprimary font-bold uppercase"
          htmlFor="idCard"
        >
          Tarjetas de Crédito
        </label>
        {currentCard ? (
          <>
            <select
              id="idCard"
              className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-4"
              onChange={handleCurrentcurrentCard}
              value={currentCard.id}
            >
              <option disabled>--Seleccionar--</option>
              {cards.map(({ number }, index) => (
                // Change for id when not static data
                <option key={index} value={number}>
                  {`Tarjeta : ${number}`}
                </option>
              ))}
            </select>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-darkprimary mt-6">
                  Numero de Tarjeta:{" "}
                  <span className="text-gray-500">{currentCard.number}</span>
                </p>
                <p className="text-darkprimary">
                  Fecha de Expiracion:{" "}
                  <span className="text-gray-500">
                    {currentCard.expiration_date}
                  </span>
                </p>
                <p className="my-2 text-darkprimary">
                  Saldo a pagar:{" "}
                  <span className="mr-2 text-red-600 font-normal text-lg ">
                    ${LIMIT_CARD - parseInt(currentCard.credit)}
                  </span>
                </p>
                <Button
                  onClick={() => {
                    setIsOpenPayCard(true);
                  }}
                >
                  <p>Pagar tarjeta</p>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p> No hay tarjetas de crédito asociadas </p>
        )}
      </div>
      {currentCard && (
        <Modal isOpen={isOpenPayCard} setIsOpen={setIsOpenPayCard}>
          <PayCreditCardForm
            amount={`${LIMIT_CARD - parseInt(currentCard.credit)}`}
            accounts={accounts}
            currentCard={currentCard}
          />
        </Modal>
      )}
    </>
  );
};

export default CreditCard;
