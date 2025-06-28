import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ConfigContext } from "../context/configContext";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const config = useContext(ConfigContext);

    const cat = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${config.REACT_APP_API_URL}/posts${cat}`);
                setPosts(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [cat]);

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className="home">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`${config.REACT_APP_API_URL}/static/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/posts/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.desc)}</p>
                            <button onClick={() => navigate(`/posts/${post.id}`)}>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
