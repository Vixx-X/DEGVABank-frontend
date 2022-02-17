import { useState } from "react";

interface DataTableProps {
  headers: any;
  items: any;
}

const DataTable = ({ headers, items }: DataTableProps) => {
  const [itemList, setItemList] = useState(items);
  const [headerList, setHeaderList] = useState(headers);

  const handleOrderClick = (attr: String) => {
    console.log("Atributo", attr);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full border shadow-xl p-1">
                <thead className="border-b border-gray-300">
                  <tr>
                    {headerList?.map((element: any) => (
                      <th
                        key={element.value}
                        scope="col"
                        className="cursor-pointer py-2 px-2 sm:py-4 sm:px-8 text-xs tracking-wider text-left uppercase text-darkprimary font-montserrat"
                        onClick={() => {
                          handleOrderClick(element.value);
                        }}
                      >
                        {element.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itemList?.map((element: any) => (
                    <tr
                      key={element.idTransaction}
                      className="border-b border-gray-200"
                    >
                      {headerList?.map((item: any) => (
                        <td
                          key={`${element}${item.value}`}
                          className="py-2 px-2 sm:py-4 sm:px-8 text-xs font-montserrat sm:text-sm whitespace-nowrap"
                        >
                          {element[item.value]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
