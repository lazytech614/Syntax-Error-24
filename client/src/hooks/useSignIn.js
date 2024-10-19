import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../contexts/userInfoContext";

const useSignIn = () => {
  //   console.log("Inside useSignIn hook");
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
  const { fetchUserData } = useUserInfoContext();

  const navigate = useNavigate();

  const signin = async (formData) => {
    setIsLoading(true);

    const success = checkInput(formData);
    // console.log("Success:", success);
    if (!success) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signin`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      //   console.log(data);

      //   Check for success before doing anything else
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        navigate("/"); // Navigate only if signIn is successful
        fetchUserData(data._id);
      } else {
        throw new Error(data.message); // Use the message from the server response
      }
    } catch (err) {
      toast.error(err.message); // Show only the error message
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signin };
};

export default useSignIn;

function checkInput({ userName, password }) {
  if (!userName || !password) {
    toast.error("Please fill all the fields");
    return false;
  }
  return true;
}
