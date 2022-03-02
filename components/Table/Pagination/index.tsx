import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

import PageButtons from "./PageButtons";

type PaginationProps = {
  totalItems: number;
  items: number;
  start: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  items,
  start,
  pageSize,
  setPageSize,
  pageNum,
  setPageNum,
}) => {
  const handlePageSize: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setPageSize(+e.currentTarget.value);
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Text fontSize="12" fontWeight="semibold" mr="6">
        {totalItems === 0 ? 0 : start} al {start + items - 1} de {totalItems}{" "}
        items
      </Text>
      <PageButtons
        totalItems={totalItems}
        pageSize={pageSize}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
      <Select
        fontSize="10px"
        fontWeight="700"
        w="98px"
        mr="6"
        size="sm"
        borderRadius="4px"
        border="2px solid"
        borderColor="#12E0A4"
        defaultValue="10"
        onChange={handlePageSize}
      >
        <option value="10">10 / pág</option>
        <option value="20">20 / pág</option>
        <option value="50">50 / pág</option>
        <option value="100">100 / pág</option>
      </Select>
    </Flex>
  );
};

export default Pagination;
