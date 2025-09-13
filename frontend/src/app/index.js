import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/app/utils/auth";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [user]);

  return null;
};

export default Home;
