import { Flex } from "@chakra-ui/layout";
import Head from "next/head";
import { AnimateSharedLayout } from "framer-motion";
import { Container } from "../components/Container";
import BoxLayout from "./box";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AnimateSharedLayout>
      <Head>
        <title>Welcome human!</title>
        <meta name="description" content="An page for humans" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <BoxLayout>{children}</BoxLayout>
        </Flex>
      </Container>
    </AnimateSharedLayout>
  );
};

type LayoutProps = {
  children: JSX.Element;
};

export default Layout;
