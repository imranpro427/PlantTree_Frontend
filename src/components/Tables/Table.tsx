//@ts-nocheck
import * as React from 'react';
import { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import { MdNavigateNext } from "react-icons/md";
import { BiLastPage, BiFirstPage } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Table({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Temperature (°C)',
        accessor: 'temperature',
      },
      {
        Header: 'Humidity (%)',
        accessor: 'humidity',
      },
      {
        Header: 'Air Quality (mq135)',
        accessor: 'mq135',
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    usePagination
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Report Overview</h1>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <BiFirstPage />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <MdNavigateNext />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <BiLastPage />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <input
            type="number"
            min="1"
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="p-1 border border-gray-300 rounded w-16 text-center"
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className=' text-sm'>Filter</div>
          <Select
            value={pageSize}
            onValueChange={(e) => setPageSize(Number(e))}
            className="w-32"
          >
            <SelectTrigger>
              <SelectValue placeholder={`Show ${pageSize}`} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  Show {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full divide-y  divide-gray-200 border-none"
        >
          <thead className=" bg-darkGreen text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-gray-200"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 text-sm text-gray-700 border border-gray-300"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
