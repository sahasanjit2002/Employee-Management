import React from "react";
import './../styles/profile.css'


const Dashboard = (props) =>{
    console.log(props)
    return(<>
    <div id="background">
        <div className="titleHeading">Hello {props.use.name}</div>
        <div className="line"></div>
        <div className="profileDisplay">
            <div className="innerProfileDisplay"><b>Name : </b><div>{props.use.name}</div></div>
            <div className="innerProfileDisplay"><b>Address :</b><div>{props.use.address}</div></div>
            <div className="innerProfileDisplay"><b>Phone :</b> <div>{props.use.phone}</div></div>
            <div className="innerProfileDisplay"><b>Email : </b><div>{props.use.email}</div></div>
        </div>
        <div className="line"></div>
        <div className="profileDisplay">
            <div className="innerProfileDisplay"><b>department </b><div>{props.use.department}</div></div>
            <div className="innerProfileDisplay"><b>Experience</b><div>{props.use.experience}</div></div>
        </div>
        </div>
    </>)
}

export default Dashboard