import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = ({cat, currentId}) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://alankerry.ru:4000/api/posts/?cat=${cat}`);
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
                    <img src={`http://alankerry.ru:4000/api/static/${post.img}`} alt="" />
                    <h2>{post.title}</h2>
                    <button onClick={() => {navigate(`/posts/${post.id}`)}}>Read More</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;
