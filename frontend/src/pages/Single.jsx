import React, { useContext, useEffect, useState } from 'react';
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from '../components/Menu';
import axios from 'axios';
import moment from "moment";
import { AuthContext } from '../context/authContext';
import { ConfigContext } from '../context/configContext';

const Single = () => {
    const [post, setPost] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];
    const {currentUser} = useContext(AuthContext);
    const config = useContext(ConfigContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${config.REACT_APP_API_URL}/posts/${postId}`);
                setPost(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.REACT_APP_API_URL}/posts/${postId}`);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    }

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className="single">
            <div className="content">
                <img src={`${config.REACT_APP_API_URL}/static/${post.img}`} alt="" />
                <div className="user">
                    {post.user?.avatar && 
                        <img src={post.user.avatar} alt="" />}
                    <div className="info">
                        <span>{post.user?.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser?.username === post.user?.username && <div className="edit">
                        <Link to={`/write?edit=2`} state={post}>
                            <img src={Edit} alt="" />
                        </Link>
                        <img onClick={handleDelete} src={Delete} alt="" />
                    </div>}
                </div>
                <h1>{post.title}</h1>
                <p>{getText(post.desc)}</p>
            </div>
            <Menu cat={post.cat} currentId={post.id}/>
        </div>
    );
}

export default Single;