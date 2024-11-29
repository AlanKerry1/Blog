import axios from 'axios';
import React, { useContext, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
    const state = useLocation().state;
    const [desc, setDesc] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    const {accessToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const publish = async e => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("img", file);
            formData.append("desc", desc);
            formData.append("title", title);
            formData.append("cat", cat);
            
            if (state) {
                formData.append("id", state.id);
            }

            for (let elem of formData.entries()) {
                console.log(elem);
            }

            const res = state ? await axios.put("/posts/", formData, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }) : await axios.post("/posts/", formData, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            navigate(`/posts/${res.data.id}`);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="add">
            <div className="content">
                <input value={title} type="text" placeholder='Title' onChange={e => setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className='editor' theme="snow" value={desc} onChange={setDesc} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display:"none"}} type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
                    <label className='file' htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={publish}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onClick={e => setCat(e.target.value)}/>
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onClick={e => setCat(e.target.value)}/>
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onClick={e => setCat(e.target.value)}/>
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onClick={e => setCat(e.target.value)}/>
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onClick={e => setCat(e.target.value)}/>
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onClick={e => setCat(e.target.value)}/>
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;
