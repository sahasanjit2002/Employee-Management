import React, { useState } from "react";
import './../styles/createProject.css'
const CreateProject = (props)=>{
    const[progName,setprogName] = useState();
    const[description,setDescription] = useState();
    const[completionDate,setCompletionDate] = useState();
    const mngID = props.empId;
    console.log(mngID)
    const createTasks = async(event)=>{
        event.preventDefault();
        const res = await fetch('http://localhost:8000/initProject',{
            method: 'POST',
            headers:{
                'content-Type' : 'application/json'
            },
            body:JSON.stringify({
                progName,
                completionDate,
                description,
                mngID
            })
        })
        const data = await res.json()
        if(data.status === "OK")
        {
            alert("Project Created")
        }
    }
    return(
        <>
            <form id="create-Task" onSubmit={createTasks}>
            <label for="" className="form-label" text-align="center">Create Project</label>
            <div className="form-data"><label for="" className="form-input-label" text-align="center">Project Name</label>
                <input value={progName} onChange={(e)=>{setprogName(e.target.value)}} type="text" name="name"  placeholder="Project Name"/>
                <label for="" className="form-input-label" text-align="center">Submission Date</label>
                <input value={completionDate} onChange={(e)=>{setCompletionDate(e.target.value)}} type="date" name="completionDate" />
                <label for="" className="form-input-label" text-align="center">Project Description</label>
                <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" name="description"  placeholder="description" id="description" className="form-control" rows="3"/><br/>
                <input className="btn btn-primary"  type="submit" value="submit"/></div>
        	</form>
        </>
    )
}

export default CreateProject