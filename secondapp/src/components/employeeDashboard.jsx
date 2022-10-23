import React, { useState } from "react";
import { useEffect, } from "react";
import  { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import ViewTask from "./viewTask";
import Profile from './profile'
const EmpDashboard = () =>{
    const[users,setUsers]=useState({
        user: ""
    });
    const[vT,setVT]=useState();
    const[prof,setProf]=useState("false")
    const history = useNavigate();
    const populateQuote = async() => {
        try{
            const req = await fetch("http://localhost:8000/userProfile",{
            headers:{
                'x-access-token' : localStorage.getItem('token'),
            },
            })
            const data = await req.json()
            console.log(data)
            if(data.status === 'ok'){
                setUsers(data.user)
            }
            else{
                alert(data.error)
            }
        }catch(err)
        {
            console.log(err)
        }
        
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const userToken = decodeToken(token)
            if(userToken){
                populateQuote();
            }
            else
            {
                localStorage.removeItem('token')
                history('/loginregister')  
            }
        }
    },[])
    return(
        <>
        <nav className="dashboard">
            <div id="menu">
                <li><div className="dash" onClick={()=>{setVT(false);setProf(true)}}><p >Profile</p></div></li>
                <li><div className="dash" onClick={()=>{setVT(true);setProf(false)}}><p>View Assigned Task</p></div></li>
            </div>
            <div id="LogOut">
            <li><div className="dash"><a onClick={()=>{localStorage.removeItem('token')}} href="/">LOG OUT</a></div></li>
            </div>
            
        </nav>
            {prof && <Profile use={users}/>}
            {vT && <ViewTask id={users.projectID} empID = {users._id}/>}
        </>
    )
}

export default EmpDashboard;