import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    // Use useCallback to memoize the function
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies

  return { isLoading, users, getUsers };
};

export default useGetUsers;
