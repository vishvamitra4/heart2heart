import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { USerContext } from "../UserContext";

export default function LoginPage() {

    const [userName, setUserName] = useState('');
    const [userPassword, setUserpassword] = useState('');
    const [redirect , setRedirect] = useState(false);
    const {setUserInfo} = useContext(USerContext);


    async function login(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' },
            credentials : 'include',
        });

        if(response.ok){
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }else{
            alert("Wrong Credential!");
        }
    };

    if(redirect){
        return  <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <h1 style={{"color" : "white"}}>Login</h1>
            <input type="text"
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input type="password"
                placeholder="password"
                value={userPassword}
                onChange={(e) => setUserpassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    )
}