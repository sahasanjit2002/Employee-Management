import React from "react";
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Dashboard from "./components/dashboard"
import EmpDashboard from "./components/employeeDashboard";
import Home from "./components/homepage";
import Login from "./components/login";
import Register from "./components/register";
const Router = ()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/registration" exact element={<Register/>}/>
                <Route path="/dashboard" exact element={<Dashboard/>}/>
                <Route path="/empDashboard" exact element={<EmpDashboard/>}/>
                </Routes>
                
            </BrowserRouter>
        </>
    )
}

export default Router