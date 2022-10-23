import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import './../styles/table.css'
const ViewTask = (props)=>{
    const id = props.id;
    const empID =  props.empID
    const[sView,setsView]=useState(true);
    const[currMng,setMng]=useState({name:""});
    const[currTask,setCurrTask]=useState({
        tasks:[]
    })
    const[taskFile,setTaskFile]=useState("")
    const[CurrentID,setCurrentID]=useState()
    const getTask = async()=>{
        const response = await fetch('http://localhost:8000/getTask',{
            method:'POST',
            headers: {
                'content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id,
                empID
            })
        })
        const data = await response.json()
        setCurrTask(data.Task)
        setMng(data.Man)
    }
    useEffect(() => {
        getTask();
    }, [])

    const submitFile = async(event)=>{
        event.preventDefault();
        //console.log("test string")
        //console.log(taskFile[0])
        var datas = new FormData();
        datas.append("taskId",CurrentID);
        datas.append("id",id);
        datas.append("taskFile",taskFile[0]);

        var Url = "http://httpbin.org/anything"
        const response = await fetch('http://localhost:8000/submitTask',{
            method:'PATCH',
            
            body: datas,
        })
        const data = await response.json()
        console.log(data)
        if(data.status === 'OK')
        {
            setsView(false)
        }
    }
    return(
        <>
        <br/>
        <div className="profileDisplay">
        Project Name: {currTask.name} <br/>
            Project Description: {currTask.prjDescription}<br/>
            Time Of Creation : {currMng.creationDate}
            Project Under: {currMng.name}
        </div>
            
            <table cellSpacing="3px" cellPadding="2px" align="center" style={{textAlign:"center",borderRadius:"3px"}}>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Submission Date</th>
                        <th>Accepted</th>
                        <th>Rejected</th>
                        <th>Comment</th>
                        <th>Submit File</th>
                    </tr>
                </thead>
                <tbody>
                    {currTask.tasks.map((value,index)=>{
                        
                        if(value.empID===empID)
                        {
                            return(
                                <tr key = {index}>
                                <td>{value.taskName}</td>
                                <td>{value.taskDescription}</td>
                                <td>{value.submissionDate}</td>
                                <td>{value.accepted ? <>✅</> : <></>}</td>
                                <td>{value.rejected ? <>🟥</>: <></>}</td>
                                <td>{value.comment}</td>
                                <td>{sView ? <form onSubmit={submitFile}><input onChange={(e)=>{setTaskFile(e.target.files);setCurrentID(value._id)}} type="file" style={{color:'white'}} accept="pdf"></input><input type="submit" value="upload"/></form>:<>"File Submitted"</>}</td>
                                </tr>
                            )
                        }
                        
                    })}
                </tbody>
            </table>
        </>
    )
}
export default ViewTask