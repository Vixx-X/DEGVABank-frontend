import Actions from "../Actions";

interface DataTableProps {
  headers: any;
  items: any;
}

const DataTable = ({
  headers: headerList,
  items: itemList,
}: DataTableProps) => {
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
                      >
                        {element.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itemList?.map((element: any, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      {headerList?.map((item: any) => (
                        <td
                          key={`${element}${item.value}`}
                          className="py-2 px-2 sm:py-4 sm:px-8 text-xs font-montserrat sm:text-sm whitespace-nowrap"
                        >
                          {element[item.value]}
                        </td>
                      ))}
                      <Actions />
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
