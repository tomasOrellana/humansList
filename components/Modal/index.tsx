import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../../context/session";
import { newHumanInput, SchemaNewHuman } from "../../models/human.model";
import InputComponent from "../input";

export type ModalComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: () => void;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<newHumanInput>({
    resolver: yupResolver(SchemaNewHuman),
  });
  const toast = useToast();
  const { session } = useSession();

  const onSubmit = (values: newHumanInput) => {
    console.log(values);
    fetch("http://localhost:8080/humans/createHuman", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.jwt,
      },
      body: JSON.stringify({
        name: values.name,
        phone: values.phone,
        address: values.address,
        email: values.email,
        region: values.region,
        country: values.country,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            toast({ description: "Hubo un error" });
            return;
          }
          onSubmitted();
          toast({ description: "Añadido correctamente" });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <InputComponent
                type="name"
                placeholder="nombre"
                text="@"
                error={errors?.name}
                onChange={(e) =>
                  setValue("name", e.target.value, { shouldValidate: true })
                }
              />
              <InputComponent
                type="text"
                placeholder="teléfono"
                text="+569"
                error={errors?.phone}
                onChange={(e) =>
                  setValue("phone", e.target.value, { shouldValidate: true })
                }
              />
              <InputComponent
                type="email"
                placeholder="email"
                text="@"
                error={errors?.email}
                onChange={(e) =>
                  setValue("email", e.target.value, { shouldValidate: true })
                }
              />
              <InputComponent
                type="text"
                placeholder="dirección"
                text="dir"
                error={errors?.address}
                onChange={(e) =>
                  setValue("address", e.target.value, { shouldValidate: true })
                }
              />
              <InputComponent
                type="text"
                placeholder="Región"
                text="reg"
                error={errors?.region}
                onChange={(e) =>
                  setValue("region", e.target.value, { shouldValidate: true })
                }
              />
              <InputComponent
                type="text"
                placeholder="País"
                text="nat"
                error={errors?.country}
                onChange={(e) =>
                  setValue("country", e.target.value, { shouldValidate: true })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="blue" type="submit">
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ModalComponent;
