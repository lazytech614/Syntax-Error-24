import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const navigate = useNavigate();

  const signup = async (formData) => {
    // console.log("Inside signup function");
    setIsLoading(true);

    const success = handleInputs(formData);

    // console.log("Success:", success);
    if (!success) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        }
      ).then((res) => res.json());

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        toast.success("Signup successful!");
        navigate("/");
      }

      if (!data.success) toast.error(data.error);
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error("Signup failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};

export default useSignUp;

function handleInputs({
  fullName,
  userName,
  gender,
  password,
  confirmPassword,
  branch,
  collegeName,
  year,
  city,
  phoneNumber,
  email,
}) {
  if (
    !fullName ||
    !userName ||
    !gender ||
    !password ||
    !confirmPassword ||
    !branch ||
    !collegeName ||
    !year ||
    !city ||
    !phoneNumber ||
    !email
  ) {
    toast.error("Please fill all the fields!");
    return false;
  } else if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return false;
  }
  return true;
}
