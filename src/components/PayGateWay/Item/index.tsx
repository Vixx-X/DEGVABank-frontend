/* eslint-disable @next/next/no-img-element */

interface ItemProp {
  name: string;
  image?: string;
  num?: number;
  amount: number;
}

const Item = ({ name, image, num, amount }: ItemProp) => {
  return (
    <div className="flex justify-between mx-6 py-2 items-center">
      <div className="flex items-center">
        <div className="relative w-16 h-16">
          <img
            className="rounded object-contain w-full h-full"
            src={image}
            alt={`Image of ${name}`}
          />
          {num && (
            <div className="absolute rounded-full bg-gray-400 h-5 w-5 top-[-8px] right-[-8px] flex justify-center items-center">
              <span className="text-sm font-semibold text-light">{num}</span>
            </div>
          )}
        </div>
        <p className="text-sm font-montserrat capitalize ml-2">{name}</p>
      </div>
      <p className="text-xl font-montserrat  tracking-wider">
        ${num ? (amount * num).toFixed(2) : amount.toFixed(2)}
      </p>
    </div>
  );
};

export default Item;
