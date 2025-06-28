import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./style.scss";
import { ConfigContext } from "./context/configContext";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "./context/authContext";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/posts/:id",
                element: <Single />,
            },
            {
                path: "/write",
                element: <Write />,
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch("/config.json")
            .then((res) => res.json())
            .then(setConfig)
            .catch(() =>
                setConfig({ REACT_APP_API_URL: "http://localhost:4000/api" })
            );
    }, []);

    if (!config) return <div>Loading...</div>;

    console.log("Config из контекста:", config);

    return (
        <ConfigContext.Provider value={config}>
            <AuthContextProvider>
                <div className="app">
                    <div className="container">
                        <RouterProvider router={router} />
                    </div>
                </div>
            </AuthContextProvider>
        </ConfigContext.Provider>
    );
}

export default App;
