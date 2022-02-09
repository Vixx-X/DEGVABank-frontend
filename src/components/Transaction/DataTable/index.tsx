interface DataTableProps {
  headers: any;
  items: any;
}

const DataTable = ({ headers, items }: DataTableProps) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {headers.map((element: any) => (
                      <th
                        key={element.value}
                        scope="col"
                        className="py-2 px-2 sm:py-3 sm:px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        {element.name}
                      </th>
                    ))}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {items.map((element: any) => (
                    <tr
                      key={element.idTransaction}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      {headers.map((item: any) => (
                        <td
                          key={`${element}${item.value}`}
                          className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {element[item.value]}
                        </td>
                      ))}

                      <td className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm font-medium text-right whitespace-nowrap">
                        <a
                          href="#"
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
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
