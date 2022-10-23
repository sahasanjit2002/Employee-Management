import React, { useState } from "react";
import { useEffect, } from "react";
import  { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import CreateProject from './createProject'
import ViewProject from "./viewProject";
import Profile from './profile'
import './../styles/dashboard.css'
const Dashboard = () =>{
    const[users,setUsers]=useState({
        user: "",
        name:""
    });
    const[prof,setProf]=useState(true)
    const[prog,setProg]=useState(false)
    const[cPr,setCpr]=useState(false)
    const[cT,setCt]=useState(false)
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
    return(<>
        <nav className="dashboard">
            <div id="menu">
                <li><div className="dash" onClick={()=>{setProf(true);setCpr(false);setProg(false);setCt(false)}}><p >Profile</p></div></li>
                <li><div className="dash" onClick={()=>{setProf(false);setCpr(true);setProg(false);setCt(false)}}><p>Create Project</p></div></li>
                <li><div className="dash" onClick={()=>{setProf(false);setCpr(false);setProg(true);setCt(false)}}><p>Project</p></div></li>
            </div>
            <div id="LogOut">
            <li><div className="dash"><a onClick={()=>{localStorage.removeItem('token')}} href="/">LOG OUT</a></div></li>
            </div>
            
        </nav>
        {prof && <Profile use={users}/>}
        {cPr && <CreateProject empId = {users._id}/>}
        {prog && <ViewProject/>}
        

    </>)
}

export default Dashboard