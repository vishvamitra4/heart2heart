import { useEffect, useState } from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";

export default function EditPost() {
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

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSumamry] = useState('');
    const [content, setContent] = useState('');
    const [files, setfiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSumamry(postInfo.summary);
                })
            })
    } , [])



    const updatePost = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }


        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
        if (response.ok === true) {
            setRedirect(true);
        }



    };

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }


    return (


        <form onSubmit={updatePost} className="CreatePost">
            <input type="title"
                placeholder={'Title'}
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
            style={{color : "white"}}
                modules={modules}
                theme={'snow'}
                value={content}
                onChange={newValue => setContent(newValue)}
            />
            <button style={{ marginTop: '5px' }}>Update</button>
        </form>

    )
}