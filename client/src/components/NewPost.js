import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";


const NewPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [quotes, setQuotes] = useState(false);
    const [phrases, setPhrases] = useState(false);
    const [poems, setPoems] = useState(false);
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const savePost = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/posts", {
            title,
            content,
            quotes,
            phrases,
            poems
        }, { withCredentials: true })
            .then(res => history.push("/"))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div>
            <h1 id="maintitle2" className="text-center">New Post</h1>
            <form onSubmit={savePost}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
                    {errors.title ? <span className="text-danger">{errors.title.message}</span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" id="content" name="content" value={content} onChange={e => setContent(e.target.value)} className="form-control" />
                    {errors.content ? <span className="text-danger">{errors.content.message}</span> : null}
                </div>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" id="quotes" name="quotes" checked={quotes} onChange={e => setQuotes(e.target.checked)} />
                    <label className="form-check-label" htmlFor="quotes">
                        Quotes
                    </label>
                </div>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" id="phrases" name="phrases" checked={phrases} onChange={e => setPhrases(e.target.checked)} />
                    <label className="form-check-label" htmlFor="phrases">
                        Phrases
                    </label>
                </div>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" id="poems" name="poems" checked={poems} onChange={e => setPoems(e.target.checked)} />
                    <label className="form-check-label" htmlFor="poems">
                        Poems
                    </label>
                </div>
                <input type="submit" className="btn btn-outline-success" value="Save Post" id="btn7" />
                <Link id="btn8" className="btn btn-outline-primary" to="/"> Cancel </Link>
            </form>
        </div>
    )

}

export default NewPost;
