
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { USerContext } from "./UserContext.js";


export default function Header() {

    const { setUserInfo ,userInfo } = useContext(USerContext);

    useEffect(() => {

        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {

            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })

        })
    }, []);


    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            mothod: 'POST',
        });
        setUserInfo(null);
    }

    const USERNAME = userInfo?.userName;



    return (
        <div class="header">
            <Link to="/" class="logo">Heart2Heart</Link>
            <div class="header-right">
                {USERNAME && (
                    <>
                        <Link>{USERNAME}</Link>
                        <Link className = "active" to="/create">Create New Credential</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!USERNAME && (
                    <>
                        <Link className ="active" to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/about">About</Link>
                    </>
                )}
            </div>
        </div>
    )
}