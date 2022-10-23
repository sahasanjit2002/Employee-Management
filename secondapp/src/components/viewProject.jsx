import React, { useEffect, useState } from "react";
import CreateTask from "./createTask";
import TaskReview from "./taskStatus";
const ViewProject = ()=>{
    const[proData,setProgData] = useState({
    });
    const[tV,setTV]=useState(false)
    const[cR,setCR]=useState(false)
    const[pP,setPP]=useState(false)
    const populateProjectDetails = async() => {
        try{
            const req = await fetch('http://localhost:8000/projectDetails',{
            headers:{
                'x-access-token' : localStorage.getItem('token'),
            },
            })
            const data = await req.json()
            if(data.status === "success")
            {
                setProgData(data.progData)
                setPP(true)
            }else{

            }
            
            
        }catch(err)
        {
            console.log(err)
        }
        
    }
    useEffect(()=>{
        populateProjectDetails();
    },[])
    return (
        <>
        <h1 style={{textAlign:'center'}}>{proData.name}</h1>
        <div className="profileDisplay">
            
            <div className="innerProfileDisplay"><b>Date Of Creation  :</b><div>{proData.creationDate}</div></div>
            <div className="innerProfileDisplay"><b>Description : </b> <div>{proData.prjDescription}</div></div>

            
             
            
        </div>
            
            <button onClick={()=>{setCR(true);setTV(false)}}>Create Task</button>
            
            {pP && <button onClick={()=>{setTV(true);setCR(false)}}>Task Status</button>}
            {cR && <CreateTask progID = {proData._id}/>}
            {tV && <TaskReview progID = {proData._id}/>}

        </>
    )
}

export default ViewProject;