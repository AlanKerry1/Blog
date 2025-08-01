import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ConfigContext } from "../context/configContext";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [err, setError] = useState(null);
    const config = useContext(ConfigContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.REACT_APP_API_URL}/auth/register`, inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input
                    required
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    required
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>
                    Do you have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
