import { useMemo } from "react";

interface DataTableProps {
  headers: any;
  items: any;
  handleOrderClick?: (atr: string) => void;
  classText?: string;
}

const DataTable = ({
  headers: headerList,
  items: itemList,
  handleOrderClick,
  classText = "md:text-sm",
}: DataTableProps) => {
  const attrs = useMemo(() => Object.keys(headerList), [headerList]);
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="min-w-full w-fit">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full border shadow-xl p-1">
                <thead className="border-b border-gray-300">
                  <tr>
                    {attrs?.map((key: any) => (
                      <th
                        key={key}
                        scope="col"
                        className="cursor-pointer py-3 px-2 sm:px-4 text-xs tracking-wider text-left uppercase text-darkprimary font-montserrat"
                        onClick={() => {
                          if (handleOrderClick) {
                            handleOrderClick(key);
                          }
                        }}
                      >
                        {headerList[key]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itemList?.map((element: any, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      {attrs?.map((key: any, idx: number) => (
                        <td
                          key={`${index}-${idx}`}
                          className={`py-3 px-2  text-xs ${classText} font-montserrat whitespace-nowrap`}
                        >
                          {
                            key!=="date" && element[key].toLocaleString()
                          }
                          {
                            key==="date" && element[key].substring(0, 10)
                          }
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
