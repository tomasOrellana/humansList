import * as yup from "yup";

export const SchemaNewHuman: yup.SchemaOf<newHumanInput> = yup.object().shape({
  name: yup.string().required("Nombre requerido"),
  phone: yup.string().required("Teléfono requerido"),
  email: yup.string().required("Email requerido"),
  address: yup.string().required("Dirección requerida"),
  region: yup.string().required("Region requerida"),
  country: yup.string().required("Pais requerido"),
});

export type Human = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  region: string;
  country: string;
};

export type newHumanInput = {
  name: string;
  phone: string;
  email: string;
  address: string;
  region: string;
  country: string;
};
