import { Box, FlexProps } from "@chakra-ui/react";
import Head from "next/head";

export const Container: React.FC<FlexProps> = ({ title, ...props }) => {
  const baseTitle = "Humans Page";
  const pageTitle = title ? `${baseTitle} - ${title}` : baseTitle;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box {...props} />
    </>
  );
};
