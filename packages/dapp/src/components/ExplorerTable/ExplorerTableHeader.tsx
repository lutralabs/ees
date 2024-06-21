export const ExplorerTableHeader = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-6 max-sm:px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase"
        >
          From
        </th>
        <th
          scope="col"
          className="px-6 py-3 max-sm:px-2 text-start text-xs font-medium text-gray-500 uppercase"
        >
          Type
        </th>
        <th
          scope="col"
          className="px-6 py-3 max-sm:px-2 text-start text-xs font-medium text-gray-500 uppercase"
        >
          EAS UID
        </th>
        <th
          scope="col"
          className="px-6 max-sm:px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase"
        >
          Age
        </th>
        <th scope="col" />
      </tr>
    </thead>
  );
};
