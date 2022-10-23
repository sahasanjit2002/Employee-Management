import React, { useState } from "react";
import './../styles/login.css'
const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userSelect, setUserSelect] = useState("")
    const sub = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                userSelect
            }),
        })
        const data = await response.json()
        console.log(data)
        if (data.user) {
            localStorage.setItem('token', data.user)
            console.log("Login SuccessFull")
            if (userSelect === 'mng') {
                window.location.href = '/dashboard'
            } else {
                window.location.href = '/empDashboard'
            }

        } else {
            alert("Invalid Credential details")
        }

    }
    return (
        <>
<div><a href="/" onClick={() => {
                    window.location.href = '/'
                }}>X</a></div>
            <form onSubmit={sub} id="login">
                
                    <p>LOGIN</p>

                <div id="logon">
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" name='username' id="name" placeholder="Username" />
                    <label htmlFor="username">Password</label>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name='password' id="pass" placeholder="password" />
                    <div>
                        <input value={userSelect} onChange={(e) => { setUserSelect("mng") }} type="radio" name="userSelect" id="manager" />
                        <label htmlFor="manager">Manager</label>
                    </div>
                    <div>
                        <input value={userSelect} onChange={(e) => { setUserSelect("emp") }} type="radio" name="userSelect" id="emp" />
                        <label htmlFor="emp">Employee</label>
                    </div>

                    <input type="submit" value="submit" id="submit"></input>
                </div>

            </form>
        </>
    )
}

export default Login


