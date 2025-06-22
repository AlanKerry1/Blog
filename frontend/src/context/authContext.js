import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token") || null);

    const login = async (inputs) => {
        const res = await axios.post("http://alankerry.ru:4000/api/auth/login", inputs);
        setCurrentUser(res.data.user);
        setAccessToken(res.data.accessToken);
    }

    const logout = async () => {
        await axios.post("http://alankerry.ru:4000/api/auth/logout");
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