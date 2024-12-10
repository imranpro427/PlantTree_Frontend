import * as React from 'react';
import  { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import { MdNavigateNext } from "react-icons/md";
import { BiLastPage,BiFirstPage } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function  Table({ data }) {
  const columns = useMemo(() => [
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Temperature',
      accessor: 'temperature',
    },
    {
      Header: 'Humidity',
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
  ], []);

  // Initialize the table instance with pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,             // Array of rows for the current page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }, // Page state
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } }, // Show 50 rows per page
    usePagination
  );

  return (
    <div>
	{/* Pagination Controls */}
      <div className='pagination flex items-center'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <BiFirstPage className=' text-3xl font-bold hover:bg-gray-400 hover:transition-colors hover:duration-300 rounded-sm' />
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <GrFormPrevious className=' text-3xl font-bold hover:bg-gray-400 hover:transition-colors hover:duration-300 rounded-sm' />
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <MdNavigateNext className=' text-3xl font-bold hover:bg-gray-400 hover:transition-colors hover:duration-300 rounded-sm' />
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <BiLastPage className=' text-3xl font-bold hover:bg-gray-400 hover:transition-colors hover:duration-300 rounded-sm' />
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        {/* <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
        <Select value={pageSize} onValueChange={ e =>  setPageSize(Number(e))}>
          <SelectTrigger className='w-[180px]'>
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
	  <div>
      <table {...getTableProps()} className='border-2 border-black w-100 mt-20 m-3'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const { key, ...restProps } = column.getHeaderProps();
                return (
                  <th key={key} {...restProps} className="border-2 border-black w-100 mt-20">
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const cellProps = cell.getCellProps();
                  const { key, ...rest } = cellProps; // Separate the key
                  return (
                    <td key={key} {...rest} className="border-2 border-black w-100 mt-20">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>


      </table>
</div>
      
    </div>
  );
}

