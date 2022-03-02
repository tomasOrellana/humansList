import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { FieldError, RegisterOptions } from "react-hook-form";
import React from "react";

type InputProps = {
  type: string;
  placeholder: string;
  text: string;
  error?: FieldError;
  onChange: (e: any) => void;
};

const InputComponent: React.FC<InputProps> = ({
  type,
  placeholder,
  text,
  error,
  onChange,
  ...rest
}) => {
  return (
    <InputGroup>
      <InputLeftAddon
        bg="linear-gradient(270deg, #328ADC 0%, #25253A 100%)"
        w={20}
        color="white"
      >
        {text}
      </InputLeftAddon>
      <Input
        isInvalid={!!error}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </InputGroup>
  );
};

export default InputComponent;
