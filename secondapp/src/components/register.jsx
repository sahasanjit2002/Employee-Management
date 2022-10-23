import React, { useState } from "react";
import './../styles/registration.css'
const Register = (props) => {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[cPassword,setCPassword] = useState("");
    const[email,setEmail] = useState("");
    const[name,setName] = useState("");
    const[address,setAddress] = useState("");
    const[exp,setExp] = useState("");
    const[department,setDepartment] = useState("");
    const[phone,setPhone] = useState("");
    const[User,setUser]=useState("")
    const[msg,setMsg]=useState("")
    const[dp,setDp]=useState("");


    const sub = async (event) =>{
        event.preventDefault()
        //console.log(dp);
        var datas = new FormData();
        datas.append("username",username)
        datas.append("password",password)
        datas.append("cPassword",cPassword)
        datas.append("email",email)
        datas.append("name",name)
        datas.append("phone",phone)
        datas.append("address",address)
        datas.append("exp",exp)
        datas.append("department",department)
        //datas.append("dp",dp[0])
        var Url
        if(User === 'emp')
        {
            Url = 'http://localhost:8000/empUser'
        }else if(User === 'mng')
        {
            Url = 'http://localhost:8000/mngUser'
        }
        else{
            setMsg("Please Select A User");
        }
        const response = await fetch(Url,{
            method:'POST',
            body: datas,
        })
        const data =await response.json()
        if(data.status === "OK")
        {
            alert("Registered Successfully")
            console.log(data);
        }
        else{
            alert("Registration Failed")
            console.log(data)
        }
    }
    return(
        <>
        <a href="/">X</a>
        <div id="registrationMsg">
        <h1>Sign Up As</h1>
            <button onClick={()=>{setUser("mng");setMsg("SignUP as a manager")}}>Manager</button>
            <button  onClick={()=>{setUser("emp");setMsg("SignUP as a Employee")}}>Employee</button>
            <br/>
            {msg}
        </div>
        
        <form onSubmit={sub} id="registration">
            
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="name" id="name" placeholder="name"/>
            <label htmlFor="phone">Phone</label>
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" name="phone" id="phone" placeholder="phone number"/>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder="email"/>
            <label htmlFor="username">Username</label>
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" id="username" placeholder="username"/>
            <label htmlFor="Password">Password</label>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="password"/>
            <label htmlFor="cPassword">cPassword</label>
            <input value={cPassword} onChange={(e)=>{setCPassword(e.target.value)}} type="password" name="cPassword" id="cpassword" placeholder="cpassword"/>
            <label htmlFor="exp">Experience</label>
            <input value={exp} onChange={(e)=>{setExp(e.target.value)}} type="number" name="exp" id="exp" placeholder="experience"/>
            <label htmlFor="address">Address</label>
            <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" name="address" id="address" placeholder="address"/>
            <label htmlFor="department">department</label>
            <input value={department} onChange={(e)=>{setDepartment(e.target.value)}} type="text" name="department" id="department" placeholder="department"/>


            <input type="submit" id="submit" value="submit"/>
        </form>
    </>
    )}

export default Register
            
            
            