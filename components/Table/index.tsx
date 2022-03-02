import {
  ChangeEventHandler,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Button } from "@chakra-ui/button";
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";

import DataTable from "./DataTable";
import Pagination from "./Pagination";
import { TableProps } from "./types";

const Table = <T extends object>({
  createBtnIcon,
  createBtnText,
  createBtnOnClick,
  columns,
  data,
  dataLoading,
  onSearch,
  pagination,
  handlePagination,
  totalDocs,
  sortById,
  columnsVisibility,
}: PropsWithChildren<TableProps<T>>): ReactElement | null => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayedData, setDisplayedData] = useState<T[]>([]);
  const displaySize =
    useBreakpointValue({
      base: "base",
      sm: "sm",
      md: "md",
      lg: "lg",
      xl: "xl",
      "2xl": "2xl",
    }) || "lg";

  const sortByValue = sortById || "name";

  const filteredColumns = columns.filter((_, index) =>
    columnsVisibility &&
    columnsVisibility[displaySize as keyof typeof columnsVisibility]
      ? columnsVisibility[
          displaySize as keyof typeof columnsVisibility
        ]?.includes(index)
      : 1
  );

  const handleOnKeyPressSearch = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onSearch(event.currentTarget.value);
      setPageNum(1);
    }
  };

  const handleOnChangeSearch: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onSearch(event.target.value);
    setPageNum(1);
  };

  useEffect(() => {
    if (pagination === false || handlePagination) setDisplayedData(data);
    else
      setDisplayedData(
        data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, pageNum, pageSize, pagination]);

  useEffect(() => {
    if (handlePagination) handlePagination(pageNum, pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, pageSize]);

  return (
    <Box w={{ base: "100%" }} h="100%" px="8" py="7">
      <Box h="90%" mb="7">
        <Flex justifyContent="space-between" mb="5">
          <InputGroup mr="6">
            <Input
              onChange={handleOnChangeSearch}
              placeholder="Buscar"
              onKeyPress={handleOnKeyPressSearch}
              borderWidth={1}
              borderRadius={10}
              variant="search"
            />
            <InputRightElement pointerEvents="none">
              <Search2Icon color={"blue"} />
            </InputRightElement>
          </InputGroup>
          {createBtnIcon && createBtnOnClick && createBtnText && (
            <Flex textAlign="center" alignItems="center">
              <Button
                leftIcon={createBtnIcon}
                fontSize="14"
                bg="linear-gradient(270deg, #328ADC 0%, #25253A 100%)"
                color="white"
                onClick={createBtnOnClick}
              >
                {createBtnText}
              </Button>
            </Flex>
          )}
        </Flex>
        <Box overflowY="scroll" h="80%">
          <DataTable
            columns={filteredColumns}
            data={displayedData}
            dataLoading={dataLoading}
            sortById={sortByValue}
          />
        </Box>
      </Box>
      {(pagination || typeof pagination === "undefined") && (
        <Pagination
          totalItems={totalDocs || data.length}
          items={displayedData.length}
          start={(pageNum - 1) * pageSize + 1}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      )}
    </Box>
  );
};

export default Table;
