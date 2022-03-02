import * as yup from "yup";
import { AuthInput } from "./types";

export const SchemaAuth: yup.SchemaOf<AuthInput> = yup.object().shape({
  name: yup.string().required("Nombre requerido"),
  password: yup.string().required("Contraseña requerida"),
});
