import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConfigContext } from "../context/configContext";

const Menu = ({cat, currentId}) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const config = useContext(ConfigContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${config.REACT_APP_API_URL}/posts/?cat=${cat}`);
                setPosts(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [cat]);

    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map(post => post.id !== currentId && (
                <div className="post" key={post.id}>
                    <img src={`${config.REACT_APP_API_URL}/static/${post.img}`} alt="" />
                    <h2>{post.title}</h2>
                    <button onClick={() => {navigate(`/posts/${post.id}`)}}>Read More</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;
