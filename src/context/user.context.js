import { createContext, useEffect, useState } from "react";
import { verify } from "../api";

const UserContext = createContext();

const UserProviderWrapper = ({children}) => {
 const [user, setUser] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const [isLoading, setIsLoading] = useState(true);
 
const storeToken = (token) => {
  localStorage.setItem("authToken", token);
}
const removeToken = () => {
  localStorage.removeItem("authToken");
}

const authenticateUser = () => {
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    (async () => {
      try {
        const response = await verify(storedToken);
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true);
      } catch (e) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    })()
  } else {
    setUser(null);
    setIsLoggedIn(false);
    setIsLoading(false);
  }
}

const logoutUser = () => {
  removeToken();
  authenticateUser();
}

useEffect(() => {
authenticateUser();
}, []);

    return (
    <UserContext.Provider value={{user, setUser, isLoggedIn, storeToken, authenticateUser, logoutUser, isLoading}}>
        {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProviderWrapper};
