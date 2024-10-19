import { createContext, useContext, useState, useEffect } from "react";

export const UserInfoContext = createContext();

export const useUserInfoContext = () => {
    return useContext(UserInfoContext);
}

export const UserInfoContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    // Fetch user data based on userId
    const fetchUserData = async (userId) => {
        if (!userId) return; // No userId means no need to fetch data

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`);
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        // Retrieve user ID from localStorage
        const userId = JSON.parse(localStorage.getItem("user"))?._id || null;

        // If userId exists, fetch user data
        if (userId) {
            fetchUserData(userId);
        }
    }, []);

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo, fetchUserData }}>
            {children}
        </UserInfoContext.Provider>
    );
}
