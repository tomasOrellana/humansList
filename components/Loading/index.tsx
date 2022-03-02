import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => {
  return (
    <Flex
      w="full"
      h="full"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner />
    </Flex>
  );
};

export default Loading;
