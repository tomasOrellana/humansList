import React from "react";
import {
  Button,
  ButtonProps,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";

export type CustomButtonType = ButtonProps & {
  text?: string;
  leftIcon?: React.ReactElement;
  forceIconBtnDisplay?: string;
};

const CustomButton: React.FC<CustomButtonType> = ({
  text,
  leftIcon,
  forceIconBtnDisplay = "lg",
  ...rest
}) => {
  enum displayValue {
    base,
    sm,
    md,
    lg,
    xl,
    "2xl",
  }

  const displaySize = (useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  }) || "base") as keyof typeof displayValue;
  const isIconButton =
    displayValue[displaySize] <=
      displayValue[forceIconBtnDisplay as keyof typeof displayValue] || !text;

  return isIconButton ? (
    <Tooltip label={text}>
      <IconButton
        aria-label="button"
        icon={leftIcon}
        {...rest}
        sx={{ ".chakra-button__icon": { margin: 0 } }}
      />
    </Tooltip>
  ) : (
    <Button
      bg="linear-gradient(270deg, #328ADC 0%, #25253A 100%)"
      color="white"
      leftIcon={leftIcon}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
