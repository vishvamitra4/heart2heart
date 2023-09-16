import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from 'date-fns';
import "./PostPage.css"
import { USerContext } from "../UserContext";



export default function PostPage() {

    
    const x =  useContext(USerContext);
    const userInfo = x.userInfo;
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
    }, []);

    if (!postInfo) return '';

    return (

        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.userName}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className = "edit-btn" to = {`/edit/${postInfo._id}`} >Edit Post</Link>
                </div>
            ) }
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}


/*
<div style={{"maxHeight" : "200px" , "display" : "flex" , "overflow" : "hidden"}} className="post-image">
                <img style = {{"objectFit" : "cover" , "objectPosition" : "center center" , "borderRadius" : "5px"}} src={`http://localhost:4000/${postInfo.cover}`} alt="PostImage" />
            </div>
            <br></br>
            <h1 style={{"margin" : "7px"}}>{postInfo.title}</h1>
            <br></br>
            <div style={{"margin" : "7px" , "color" : "#2f2f2f"}} dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            */