import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const BoxLayout: React.FC<BoxLayoutProps> = ({ children }) => {
  return (
    <Flex
      alignItems="center"
      w="100%"
      justifyContent="center"
      h="100vh"
      position="relative"
    >
      <Box
        position="absolute"
        zIndex="1"
        w="100%"
        h="100%"
        bg="linear-gradient(270deg, #328ADC 0%, #25253A 100%)"
        right="0"
        top="0"
      />
      <Flex
        position="absolute"
        zIndex="2"
        marginLeft="auto"
        marginRight="auto"
        left="0"
        right="0"
        bg="white"
        flexDir="initial"
        h="60%"
        minH="580px"
        maxW="1100px"
        w="100vw"
        border="1px"
        borderRadius="40px"
        borderColor="gray.700"
      >
        <Flex
          position="relative"
          w={{ base: "100%" }}
          alignItems="center"
          justifyContent="center"
          p="10px"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

type BoxLayoutProps = {
  children: JSX.Element;
};

export default BoxLayout;
