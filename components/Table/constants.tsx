import { Column } from "react-table";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import CustomButton from "../Button";
import { Flex, Text } from "@chakra-ui/react";
import { Human } from "../../models/human.model";

export const truncateWord = (str: string, max: number): string => {
  if (str === null) return str;

  if (str.length > max) return `${str.substring(0, max)}...`;
  else return str;
};

export const getColumns = (handleDelete: (id: string) => void) => {
  const columns: Column<Human>[] = [
    {
      Header: "Nombre",
      id: "name",
      accessor: (d) => <Text>{d.name}</Text>,
    },
    {
      Header: "Email",
      id: "email",
      accessor: (d) => <Text noOfLines={1}>{truncateWord(d.email, 10)}</Text>,
    },
    {
      Header: "Dirección",
      id: "address",
      accessor: (d) => <Text noOfLines={1}>{d.address}</Text>,
    },
    {
      Header: "Región",
      id: "region",
      accessor: (d) => <Text>{d.region}</Text>,
    },
    {
      Header: "Pais",
      id: "country",
      accessor: (d) => <Text>{d.country}</Text>,
    },
    {
      Header: " ",
      accessor: (d) => (
        <Flex>
          <CustomButton
            size="sm"
            variant="danger"
            onClick={() => handleDelete(d._id)}
            leftIcon={<DeleteIcon />}
            text="Eliminar"
          />
        </Flex>
      ),
    },
  ];

  return columns;
};
