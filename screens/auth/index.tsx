import { Button, Flex, Image, VStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInput } from "./types";
import { SchemaAuth } from "./helper";
import InputComponent from "../../components/input";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useSession } from "../../context/session";

const SignIn = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { _setSession, session } = useSession();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AuthInput>({
    resolver: yupResolver(SchemaAuth),
  });

  const handleSignIn = (values: AuthInput) => {
    console.log(values);
    setIsLoading(true);

    fetch("http://localhost:8080/users/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: values.name, password: values.password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (!result.error) {
            _setSession({ ...session, jwt: result.token, logged: true });
            toast({ description: "credenciales correctas" });
            router.push("/list");
          } else {
            toast({ description: "credenciales incorrectas" });
            setIsLoading(false);
          }
        },
        (error) => {
          console.log(error);
          toast({ description: "algo salió mal" });
          setIsLoading(false);
        }
      );
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Flex flexDir="column" alignItems="center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1.1, 1, 1, 1, 1],
            rotate: [0, 0, 0, 0, 45, 0, -45, 0],
          }}
          transition={{
            duration: 2,
            repeatType: "mirror",
            repeatDelay: 4,
          }}
        >
          <Image src="alien.png" w={200} alt="alien logo" mb={20} />
        </motion.div>

        <VStack spacing={5}>
          <InputComponent
            type="name"
            placeholder="name"
            text="@"
            error={errors?.name}
            onChange={(e) =>
              setValue("name", e.target.value, { shouldValidate: true })
            }
          />
          <InputComponent
            type="password"
            placeholder="contraseña"
            text="***"
            error={errors?.password}
            onChange={(e) =>
              setValue("password", e.target.value, { shouldValidate: true })
            }
          />

          <Button
            type="submit"
            bg="linear-gradient(270deg, #328ADC 0%, #25253A 100%)"
            color="white"
            size="lg"
          >
            Acceder
          </Button>
        </VStack>
      </Flex>
    </form>
  );
};

export default SignIn;
