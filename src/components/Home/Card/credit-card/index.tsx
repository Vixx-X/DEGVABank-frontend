import { useState } from "react";

const ITEMS_CARDS = [
  {
    id: "013400000000002091933",
    securityCode: 564,
    fecha: new Date(),
  },
  {
    id: "013400000000002091933",
    securityCode: 564,
    fecha: new Date(),
  },
  {
    id: "013400000000002091933",
    securityCode: 564,
    fecha: new Date(),
  },
  {
    id: "013400000000002091933",
    securityCode: 564,
    fecha: new Date(),
  },
];

const CreditCard = () => {
  const [bill, setbill] = useState(ITEMS_CARDS[0]);

  const handleCurrentBill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const findBill = ITEMS_CARDS.find(({ id }) => e.target.value == id);
    if (findBill) {
      setbill(findBill);
    }
  };
  return (
    <>
      <div className="rounded-2xl w-full overflow-hidden shadow-lg p-8">
        <label
          className="text-darkprimary font-bold uppercase"
          htmlFor="idBill"
        >
          Tarjetas de Crédito
        </label>
        <select
          id="idBill"
          className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-4"
          onChange={handleCurrentBill}
          value={bill.id}
        >
          <option disabled>
            --Seleccionar--
          </option>
          {ITEMS_CARDS.map(({ id }, index) => (
            // Change for id when not static data
            <option key={index} value={id}>
              {`Tarjeta : ${id}`}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CreditCard;