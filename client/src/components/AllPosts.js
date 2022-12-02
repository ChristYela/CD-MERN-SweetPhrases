import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory()
    useEffect(() => {
        axios.get("http://localhost:8000/api/posts", { withCredentials: true })
            .then(res => setPosts(res.data))
            .catch(err => {
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });
    }, [history])

    const deletePost = id => {
        if (window.confirm("Are You sure to delete this post?")) {
            axios.delete("http://localhost:8000/api/posts/" + id, { withCredentials: true })
                .then(res => {
                    let newList = posts.filter(post => post._id !== id);
                    setPosts(newList);
                })
                .catch(err => console.log(err.response))
        }
    }

    

    const closeSession = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => history.push('/login'))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1 id="maintitle1" className="text-center">Sweet Phrases!</h1>
            <Link to="/new" className="btn btn-outline-success" id="btn3">New Post</Link>
            <button className="btn btn-outline-danger float-right" id="btn4" onClick={closeSession}>Log Out</button>
            <table className="table table-hover">
                <thead id="subtitles">
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Quotes</th>
                        <th>Phrases</th>
                        <th>Poems</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post, index) => (
                            <tr key={index}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>
                                    {
                                        post.quotes ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        post.phrases ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        post.poems ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                
                                    <Link id="btn5" className="btn btn-outline-warning" to={`/post/edit/${post._id}`}>Edit Post</Link>
                                    <button id="btn6" className="btn btn-outline-danger" onClick={() => deletePost(post._id)} >Delete Post</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default AllPosts;