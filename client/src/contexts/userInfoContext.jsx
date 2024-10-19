import { createContext, useContext, useState, useEffect } from "react";

export const UserInfoContext = createContext();

export const useUserInfoContext = () => {
    return useContext(UserInfoContext);
}

export const UserInfoContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        // Retrieve user ID from localStorage
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        
    
        // If userId exists, fetch user data
        if (userId) {
          const fetchUserData = async () => {
            try {
            //   const response = await axios.get(`/api/users/${userId}`);
            //   setUserInfo(response.data);
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`).then((res) => res.json()).then((data) => setUserInfo(data));
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          };
          
          fetchUserData();
        }
      }, []);


    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
}