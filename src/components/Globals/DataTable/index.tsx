import { useMemo } from "react";

interface DataTableProps {
  headers: any;
  items: any;
  handleOrderClick?:(atr:string)=>void;
}

const DataTable = ({
  headers: headerList,
  items: itemList,
  handleOrderClick
}: DataTableProps) => {
  const attrs = useMemo(() => Object.keys(headerList), [headerList]);
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full border shadow-xl p-1">
                <thead className="border-b border-gray-300">
                  <tr>
                    {attrs?.map((key: any) => (
                      <th
                        key={key}
                        scope="col"
                        className="cursor-pointer py-2 px-2 sm:py-4 sm:px-8 text-xs tracking-wider text-left uppercase text-darkprimary font-montserrat"
                        onClick={()=>{
                          if(handleOrderClick){
                            handleOrderClick(key)
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
                          className="py-2 px-2 sm:py-4 sm:px-8 text-xs font-montserrat sm:text-sm whitespace-nowrap"
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
