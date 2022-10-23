import React, { useState } from "react";
import Register from "./register";
import Login from "./login";

const LogRegMain = () =>{
    const[logView,setLogRegView] = useState(false)
    const[regView,setRegView]=useState(false)
    const[buttons,setButton] = useState(true)
    const changeView = (view)=>{
        setLogRegView(false)
        setRegView(false)
        setButton(true)
    }
    const viewChange = ()=>{
        setLogRegView(true)
        setRegView(false)
        setButton(false)
    }
    return(
        <>
        <div>
        {buttons &&
            <div>
                <button onClick={()=>{setLogRegView(true);setRegView(false);setButton(false);}}>Login</button>
                <button onClick={()=>{setLogRegView(false);setRegView(true);setButton(false);}}>Registration</button> 
            </div>}
            
            {logView && <Login onSelect ={[changeView,viewChange]}/>}
            {regView && <Register onSelect ={changeView}/>}          
        </div>
        </>
    )
}

export default LogRegMain
