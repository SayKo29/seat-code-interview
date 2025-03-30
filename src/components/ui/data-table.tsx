import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  Header,
  HeaderGroup,
  Row,
  Cell,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { ChevronUp, ChevronDown, ChevronsLeft, ChevronsRight, MoveLeft, MoveRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTableComponent<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation("common");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
                <TableRow key={headerGroup.id} className="border-b border-gray-300 dark:border-gray-700">
                  {headerGroup.headers.map((header: Header<TData, unknown>) => (
                    <TableHead 
                      key={header.id}
                      className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                    >
                      <div className="flex items-center space-x-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                          <span className="inline-flex">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            ) : (
                              <div className="h-4 w-4 opacity-0 group-hover:opacity-70">
                                <ChevronUp className="h-2 w-2" />
                                <ChevronDown className="h-2 w-2" />
                              </div>
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: Row<TData>, index: number) => (
                  <TableRow
                    key={row.id}
                    className={`
                      border-b border-gray-300 dark:border-gray-700 
                      ${index % 2 === 0 
                        ? "bg-white dark:bg-gray-900" 
                        : "bg-gray-50 dark:bg-gray-800/30"}
                    `}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                      <TableCell 
                        key={cell.id}
                        className="py-3 px-4 text-gray-800 dark:text-gray-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-600 dark:text-gray-400 font-medium"
                  >
                    {t("pagination.noResults")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {table.getRowModel().rows?.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-medium mb-4 sm:mb-0">
            {t("pagination.page")} {table.getState().pagination.pageIndex + 1} {t("pagination.of")} {table.getPageCount()} {" "}
            ({data.length} {t("pagination.results")})
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="hidden sm:flex items-center gap-1"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1"
            >
              <MoveLeft className="h-4 w-4" />
              {t("buttons.previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1"
            >
              {t("buttons.next")}
              <MoveRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="hidden sm:flex items-center gap-1"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Memoize DataTable for performance optimization
export const DataTable = React.memo(DataTableComponent) as typeof DataTableComponent; 