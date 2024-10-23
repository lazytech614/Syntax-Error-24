import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
import { useAuthContext } from "../contexts/AuthContext";

const useLogOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const logOut = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "appication/json" },
        }
      ).then((res) => res.json());

      if (data.error) throw new Error(data.error);

      localStorage.removeItem("user");
      localStorage.removeItem("isLikeClicked");
      localStorage.removeItem("isDislikeClicked");
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, logOut };
};

export default useLogOut;
