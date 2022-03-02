import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Loading from "../components/Loading";
import ModalComponent from "../components/Modal";
import Table from "../components/Table";
import { getColumns } from "../components/Table/constants";
import { useSession } from "../context/session";
import { Human } from "../models/human.model";

const List = () => {
  const { session } = useSession();
  const router = useRouter();
  const [paginationOptions, setPaginationOptions] = useState({
    page: 0,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Human[] | null>(null);
  const [dataTotal, setDataTotal] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handlePagination = (page: number, limit: number) => {
    setPaginationOptions({ page, limit });
    loadData(page, limit);
  };

  const handleSearch = (value: string) => {
    loadData(paginationOptions.page, paginationOptions.limit, value);
  };

  const handleDelete = async (id: string) => {
    if (id)
      fetch("http://localhost:8080/humans/deleteHuman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.jwt,
        },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.error) {
              toast({ description: "Hubo un error" });
              return;
            }
            loadData(paginationOptions.page, paginationOptions.limit);
            toast({ description: "Eliminado correctamente" });
          },
          (error) => {
            console.log(error);
          }
        );
  };

  const loadData = async (page: number, limit: number, value = "") => {
    fetch(
      `http://localhost:8080/humans/getAll?limit=${limit}&page=${page}&value=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.jwt,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result.humans);
          setDataTotal(result.total);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        }
      );
  };

  const onSubmitted = () => {
    loadData(paginationOptions.page, paginationOptions.limit);
    onClose();
  };

  useEffect(() => {
    loadData(paginationOptions.page, paginationOptions.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!session.logged) router.push("/auth");
  }, [session, router]);

  if (!data || !dataTotal) return <Loading />;

  return (
    <>
      <Table
        createBtnIcon={<FiPlus />}
        createBtnText="Crear humano"
        createBtnOnClick={onOpen}
        columns={getColumns(handleDelete)}
        data={data}
        dataLoading={isLoading}
        onSearch={handleSearch}
        handlePagination={handlePagination}
        totalDocs={dataTotal}
        sortById="name"
      />
      <ModalComponent
        onClose={onClose}
        isOpen={isOpen}
        onSubmitted={onSubmitted}
      />
    </>
  );
};

export default List;
