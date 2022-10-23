import React, { useState,useEffect } from "react";
import './../styles/table.css'
import './../styles/createTask.css'
const CreateTask = (props)=>{
    const[taskName,setTaskName]= useState("");
    const[employeeID,setEmpID]=useState("");
    const[SubmissionDate,setSubmissionDate]=  useState("");
    const[taskDescription,setTaskDescription]=useState("");
    const[fetUser,setfetUser] = useState([]);
    const progID=props.progID
    const createTask = async(event)=>{
        event.preventDefault()
        console.log(taskName)
        const response = await fetch('http://localhost:8000/task',{
            method : 'PATCH',
            headers : {
                 'content-Type' : 'application/json'
            },
            body: JSON.stringify({
                taskName,employeeID,SubmissionDate,taskDescription,progID

            }),
        })
        const data = await response.json()
        console.log(data)
    }
    const getEmp = async()=>{
        const response = await fetch('http://localhost:8000/getUsers',{
        headers:{
            'content-Type' : 'application/json'
        }
        });
        const data = await response.json()
        if(data.status === 'ok')
        {
            setfetUser(data.emp);
            console.log(fetUser)
        }

    }
        
    useEffect(() => {
        getEmp()
    },[])
    
    return(
        <>
            <form id="createTask" onSubmit={createTask}>
            <p >Create Task</p>
            <div id="createTask-inner">
            <label htmlFor="exampleFormControlInput1" className="form-label-createTask">Task Name</label>
                    <input value={taskName} onChange={(e)=>{setTaskName(e.target.value)}} type="text" name="taskName" className="form-control" placeholder="task Name" id="exampleFormControlInput1"/>
                    <label htmlFor="exampleFormControlInput1" className="form-label-createTask">Employee ID</label>
                    <input value={employeeID} onChange={(e)=>{setEmpID(e.target.value)}} type="text" disabled name="empId" className="form-control" placeholder="Employee ID" id="exampleFormControlInput1"/>
                    <label htmlFor="exampleFormControlInput1" className="form-label-createTask">Submission Date</label>
                    <input value={SubmissionDate} onChange={(e)=>{setSubmissionDate(e.target.value)}} type="date" name="submissionDate" className="form-control" id="exampleFormControlInput1"/>
                    <label htmlFor="exampleFormControlInput1" className="form-label-createTask">Task Description</label>
                    <input value={taskDescription} onChange={(e)=>{setTaskDescription(e.target.value)}} type="text" name="taskDescription"  placeholder="task description" className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                <input className="btn btn-primary"  type="submit" value="submit"/>
            </div>
                    
            </form>
            <table id="empData">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Experience</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                {
                    fetUser.map((value,id)=>{
                        return(
                        <tr key={id}>
                        <td>{value._id}</td>
                        <td>{value.name}</td>
                        <td>{value.username}</td>
                        <td>{value.experience}</td>
                        <td>{value.email}</td>
                        <td>{value.status ? "Available" : "Not available"}</td>
                        <td>{value.status && <button onClick={()=>{setEmpID(value._id)}}>Assign</button>}</td>
                        </tr>)
                })
                }
                </tbody>
            </table>
        </>
    )
}
export default CreateTask