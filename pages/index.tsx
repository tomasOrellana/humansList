import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "../context/session";

const Home: NextPage = () => {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.logged) router.push("/auth");
    else router.push("/list");
  });

  return null;
};

export default Home;
