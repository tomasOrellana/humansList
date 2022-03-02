import * as React from "react";
import { Column, useSortBy, useTable } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  chakra,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { SortById } from "../types";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: Column<Data>[];
  dataLoading: boolean;
  sortById?: SortById<Data>;
  disableSortBy?: boolean;
  variant?: string;
};

function DataTable<Data extends object>({
  data,
  columns,
  dataLoading,
  sortById,
  disableSortBy = false,
  variant,
}: DataTableProps<Data>) {
  const {
    getTableProps,
    footerGroups,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      disableSortBy,
      initialState: {
        pageIndex: 0,
        sortBy: [
          {
            id: sortById || "name",
            desc: false,
          },
        ],
      },
    },
    useSortBy
  );

  return (
    <Table {...getTableProps()} variant={variant ?? "simple"}>
      <Thead>
        {headerGroups.map((headerGroup, index) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={`${index + 1}`}>
            {headerGroup.headers.map((column, index) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={`${index + 1}`}
                border="none"
              >
                <Flex>
                  <Text
                    variant="basic"
                    fontWeight="600"
                    textTransform="capitalize"
                  >
                    {column.render("Header")}
                  </Text>
                  <chakra.span pl="4">
                    {column.isSorted &&
                      (column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      ))}
                  </chakra.span>
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {dataLoading ? (
          <Tr>
            <Td colSpan={columns.length} textAlign="center" border="none">
              <Spinner />
            </Td>
          </Tr>
        ) : (
          rows.map((row, index) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()} key={`${index + 1}`}>
                {row.cells.map((cell, index) => (
                  <Td
                    border="none"
                    {...cell.getCellProps()}
                    key={`${index + 1}`}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })
        )}
      </Tbody>
      <Tfoot>
        {footerGroups.map((group, index) => (
          <Tr {...group.getFooterGroupProps()} key={`${index + 1}`}>
            {group.headers.map((column, index) => (
              <Td {...column.getFooterProps()} key={`${index + 1}`}>
                {column.render("Footer")}
              </Td>
            ))}
          </Tr>
        ))}
      </Tfoot>
    </Table>
  );
}

export default DataTable;
