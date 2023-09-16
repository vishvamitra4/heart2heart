
import { useState } from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

export default function CreatePost() {

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };


    const [title, setTitle] = useState('');
    const [summary, setSumamry] = useState('');
    const [content, setContent] = useState('');
    const [files, setfiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const createNewPost = async function (ev) {

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials : 'include',
        })
        if (response.ok) {
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost} className="CreatePost">
            <input type="title"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
            />
            <input type="summary" placeholder={'Summary'}
                value={summary}
                onChange={ev => setSumamry(ev.target.value)}
            />
            <input type="file"
                onChange={ev => setfiles(ev.target.files)}
            />
            <ReactQuill
                modules={modules}
                theme={'snow'}
                value={content}
                onChange={newValue => setContent(newValue)}
                style={{"backgroundColor" : "white" , "color" : "black"}}
            />
            <button style={{ marginTop: '5px' }}>Create Post</button>
        </form>
    )
}