import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import DebouncedInput from "./DebouncedInput";
import { CiSearch } from "react-icons/ci";
import styles from "../../../styles/table.module.css";
import { TRANSACTIONS } from "../../mockData";
import ActionsDropdown from "./ActionDropdown";



const TanStackTable = () => {
  const columnHelper = createColumnHelper();
  
const columns = [
  columnHelper.accessor("transactionDate", {
    header: "Transaction Date",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("transactionId", {
    header: "Transaction ID",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => <span>${info.getValue().toFixed(2)}</span>,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => {
      const category = info.getValue();
      return (
        <span
          className={styles.categoryCell}
          style={{
            backgroundColor: categoryColors[category] || '#ccc', 
          }}
        >
          {category}
        </span>
      );
    },
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: (info) => (
      <ActionsDropdown
        onView={() => handleView(info.row.original)}
        onDelete={() => handleDelete(info.row.original)}
      />
    ),
  }),
];

const [data , setData] = useState(() => [...TRANSACTIONS]);
const [globalFilter, setGlobalFilter] = useState("");

const table = useReactTable({
  data,
  columns,
  state: {
    globalFilter,
  },
  getFilteredRowModel: getFilteredRowModel(),
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

const categoryColors = {
  income: '#4caf50', // Green for income
  Groceries: '#2196F3', // Blue for Groceries
  Utilities: '#ff9800', // Orange for Utilities
  Entertainment: '#9C27B0', // Purple for Entertainment
  Travel: '#E91E63', // Pink for Travel
  Miscellaneous: '#607D8B', // Blue-gray for Miscellaneous
};

const handleView = (transaction) => {
  console.log('View transaction:', transaction);
};

const handleDelete = (transactionId) => {
  setData(prevData => prevData.filter(transaction => transaction.transactionId !== transactionId));
};
return (
  <div style={{width:"100%"}}>
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.searchContainer}>
          <CiSearch />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.tableLower}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.headerContainer}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.tableHeaderCell}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={
                    i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.tableCell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className={styles.noRecordRow}>
                <td colSpan={columns.length}>No Record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    {/* pagination */}
    <div className={styles.paginationContainer}>
      <button
        onClick={() => {
          table.previousPage();
        }}
        disabled={!table.getCanPreviousPage()}
        className={styles.paginationButton}
      >
        {"<"}
      </button>
      <button
        onClick={() => {
          table.nextPage();
        }}
        disabled={!table.getCanNextPage()}
        className={styles.paginationButton}
      >
        {">"}
      </button>
      <span className={styles.pageInfo}>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </strong>
      </span>
      <span className={styles.goToPageContainer}>
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className={styles.pageInput}
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className={styles.pageSizeSelect}
      >
        {[10, 20, 30, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  </div>
);
};

export default TanStackTable;