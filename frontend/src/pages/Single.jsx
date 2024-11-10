import React from 'react';
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link} from "react-router-dom";
import Menu from '../components/Menu';

const Single = () => {
    return (
        <div className="single">
            <div className="content">
                <img src="https://img.freepik.com/premium-photo/squirrel-sitting-tree-branch_1048944-30371835.jpg?w=900" alt="" />
                <div className="user">
                    <img src="https://shapka-youtube.ru/wp-content/uploads/2024/08/avatarka-ananasa.jpg" alt="" />
                    <div className="info">
                        <span>Alan</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <Link to={`/write?edit=2`}>
                            <img src={Edit} alt="" />
                        </Link>
                        <img src={Delete} alt="" />
                    </div>
                </div>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat porttitor urna, eu tincidunt nibh finibus non. Nunc imperdiet, arcu a convallis feugiat, turpis arcu vehicula augue, eu placerat purus libero ac neque. Donec nec ullamcorper quam, ut convallis nunc. Donec lobortis in nunc in pulvinar. Nulla euismod ante et venenatis malesuada. Nulla molestie sapien id tincidunt faucibus. Nullam in felis leo. Suspendisse laoreet nisl commodo ante congue vulputate. Aliquam nisl ipsum, molestie nec cursus ut, feugiat in mi. Aliquam ut hendrerit nunc. Vestibulum id cursus enim, sed sagittis dui. Nam nec ipsum quam. Ut sed dui dui. Pellentesque vitae tristique dui. Quisque rutrum tortor et libero ullamcorper, ut viverra est mollis. Mauris tortor nunc, convallis nec risus id, mollis bibendum lacus.</p>
            </div>
            <Menu/>
        </div>
    );
}

export default Single;