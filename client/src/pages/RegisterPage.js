
import { useState } from "react";


export default function RegisterPage() {

    const [userName, setUserName] = useState('');
    const [userPassword, setUserpassword] = useState('');

    async function Register(event) {
        event.preventDefault();
        const Response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (Response.status === 200) {
            alert('Registration Successful!');
        } else {
            alert('Registration failed!');
        }

    }

    return (
        <form className="login" onSubmit={Register}>
            <h1 style={{"color" : "white"}}>Register</h1>

            <input type="text"
                placeholder="username"
                value={userName}
                onChange={ev => setUserName(ev.target.value)}
            />
            <input type="password"
                placeholder="password"
                value={userPassword}
                onChange={ev => setUserpassword(ev.target.value)}
            />
            <button>Register</button>
        </form>
    );
};