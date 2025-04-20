import useTable from '@hooks/table/useTable';

interface TableProps {
  data: any[];
  columns: any[];
  filter?: string;
  dataToFilter?: any[];
  initialSortName?: string;
  onSelectionChange?: (selection: any[]) => void;
}

export default function Table({
  data,
  columns,
  filter,
  dataToFilter,
  initialSortName,
  onSelectionChange,
}: TableProps) {
  const { tableRef } = useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange });

  return (
    <div className="table-container">
      <div ref={tableRef}></div>
    </div>
  );
}
