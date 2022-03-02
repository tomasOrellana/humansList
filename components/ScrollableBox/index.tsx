import { Box } from "@chakra-ui/layout";
import { ChakraComponent } from "@chakra-ui/system";

type ScrollableBoxProps = {
  transparent?: boolean;
};

const ScrollableBox: ChakraComponent<"div", ScrollableBoxProps> = ({
  children,
  transparent,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: transparent ? "transparent" : "#FFCC0D",
          border: `1px solid transparent`,
          borderRadius: 10,
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: transparent ? "transparent" : "#E6B80C",
          borderColor: "transparent",
        },
        "::-webkit-scrollbar-corner": {
          background: "transparent",
        },
        scrollbarColor: `#FFCC0D transparent`,
        scrollbarWidth: "thin",
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollableBox;
