import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import { ConfigContext } from "./configContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token") || null);
    const config = useContext(ConfigContext);

    const login = async (inputs) => {
        const res = await axios.post(`${config.REACT_APP_API_URL}/auth/login`, inputs);
        setCurrentUser(res.data.user);
        setAccessToken(res.data.accessToken);
    }

    const logout = async () => {
        await axios.post(`${config.REACT_APP_API_URL}/auth/logout`);
        setCurrentUser(null);
        setAccessToken(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        localStorage.setItem("token", accessToken);
    }, [currentUser, accessToken]);

    return (
        <AuthContext.Provider value={{currentUser, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}