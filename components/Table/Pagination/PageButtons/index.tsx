/* eslint-disable max-lines-per-function */
import { Dispatch, MouseEventHandler, SetStateAction, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";

type PaginationProps = {
  totalItems: number;
  pageSize: number;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
};

const PageButtons: React.FC<PaginationProps> = ({
  totalItems,
  pageSize,
  pageNum,
  setPageNum,
}) => {
  const [isPagesBtnHidden] = useMediaQuery("(max-width: 1024px)");
  const pagesQuantity = 4;
  const totalPages = Math.ceil(totalItems / pageSize);
  let pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages > pagesQuantity)
    if (totalPages - pageNum >= pagesQuantity)
      pages = pages.slice(pageNum - 1, pageNum - 1 + pagesQuantity);
    else pages = pages.slice(totalPages - pagesQuantity, totalPages);

  const handleOnChangePage: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;

    switch (value) {
      case "prev":
        if (pageNum !== 1) setPageNum(pageNum - 1);
        break;
      case "next":
        if (pageNum !== totalPages) setPageNum(pageNum + 1);
        break;

      default:
        setPageNum(+e.currentTarget.value);
        break;
    }
  };

  useEffect(() => {
    if (totalPages !== 0 && pageNum > totalPages) setPageNum(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  return (
    <ButtonGroup variant="outline" spacing="2" mr="6" size="sm">
      <IconButton
        variant="paginationButton"
        disabled={totalPages === 0}
        value="prev"
        aria-label="Search database"
        icon={<FiChevronLeft color="black" />}
        border="1px solid"
        borderColor="#12E0A4"
        onClick={handleOnChangePage}
      />
      {!isPagesBtnHidden &&
        pages.map((e) => (
          <Button
            key={e}
            border="1px solid"
            borderColor="#12E0A4"
            value={e}
            onClick={handleOnChangePage}
            isActive={pageNum === e}
            _active={{ bg: "transparent" }}
          >
            {e}
          </Button>
        ))}
      <IconButton
        disabled={totalPages === 0}
        variant="paginationButton"
        value="next"
        aria-label="Search database"
        border="1px solid"
        borderColor="#12E0A4"
        icon={<FiChevronRight color="black" />}
        onClick={handleOnChangePage}
      />
    </ButtonGroup>
  );
};

export default PageButtons;
