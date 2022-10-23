import React from "react";
import './../styles/home.css'
const Home = ()=>{
    return(
        <>
            <nav className="home">
                <a href="/">Home</a>
                <a href="#two">Why Us?</a>
                <a href="/">Our Goals</a>
                <a href="/registration">Join Us</a>
                <a href="/login">Members</a>
                <a href="/">About US</a>
            </nav>

            <div id="intro">
                <p id="emp">Employee Management System</p>
            </div>
            <div id="two">
            <p id="whyUS">Why US?</p>
            </div>
        </>
    )
}

export default Home