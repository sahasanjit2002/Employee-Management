import React, { useEffect, useState } from "react";
import './../styles/table.css'
import Axios from 'axios'
import fileDownload from 'js-file-download'
import axios from "axios";
const TaskReview = (props)=>{
    const id = props.progID;
    const[comment,setComment]=useState("")
    const[taskID,setTaskID]=useState("")
    const[fileView,setFileView]=useState(false)
    const[File,setFile]=useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
            setNumPages(numPages);
    }
    const[currTask,setCurrTask]=useState({
        tasks:[]
    })
    const getTask = async()=>{
        const response = await fetch('http://localhost:8000/getTask',{
            method:'POST',
            headers: {
                'content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id,
            })
        })
        console.log(id)
        const data = await response.json()
        if(data){
            console.log(data)
            setCurrTask(data.Task)
        }
        
        //console.log(currTask)
    }
    useEffect(() => {
        getTask();
    }, [])
    const commentSubmit = async(event)=>{
        //comment submit
        event.preventDefault()
        const response = await fetch("http://localhost:8000/setComment",{
            method : 'PATCH',
            headers : {
                 'content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id,
                taskID,
                comment
            }),
        })
        const data = await response.json()
        if(data)
        {
            alert("Comment Submitted")
        }
    }
    const accept = async(value)=>{
        setTaskID(value)
        //var datas = new FormData
        //datas.append("id",id)
        //datas.append("taskID",taskID);
        const response = await fetch("http://localhost:8000/accept",{
            method : 'PATCH',
            headers : {
                 'content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id,
                taskID,
            }),
        })

        const data = await response.json()
       
    }
    const reject = async(value)=>{
        setTaskID(value)
        const response = await fetch("http://localhost:8000/reject",{
            method : 'PATCH',
            headers : {
                 'content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id,
                taskID,
            }),
        })

        const data = await response.json()
    }
    const fetchFile = async(filename)=>{
        //console.log("Hello World")
        const response = await fetch("http://localhost:8000/getTaskFile",{
            method : 'POST',
            headers : {
                 'content-Type' : 'application/json'
            },
            responseType:"blob",
            body: JSON.stringify({
                filename
            }),
        })
        const data = await response.blob()
        console.log(data);
        if(data)
        {
            fileDownload(data,"download.pdf")
        }
        
    }
    useEffect(() => {
    }, [])
    
    return(
            <>
                <table id="empData">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Submission Date</th>
                        <th>Accept</th>
                        <th>Reject</th>
                        <th>Comment</th>
                        <th>View File</th>
                    </tr>
                </thead>
                <tbody>
                    {currTask.tasks.map((value,index)=>{
 
                            return(
                                <tr key = {index}>
                                <td>{value.taskName}</td>
                                <td>{value.taskDescription}</td>
                                <td>{value.submissionDate}</td>
                                <td><button className="active" onClick={(e)=>{accept(value._id)}}>Accept</button></td>
                                <td><button onClick={(e)=>{reject(value._id)}}>Reject</button></td>
                                <td>
                                    <form onSubmit={commentSubmit}>
                                        <input  onChange={(e)=>{setTaskID(value._id);setComment(e.target.value);}} type="text"></input>
                                        <input type="Submit"></input>
                                    </form></td>
                                    <td><button onClick={()=>{fetchFile(value.taskFile)}}>view Submitted File</button></td>
                                </tr>
                        )
                        
                    })}
                </tbody>
            </table>
            </>
    )
}
export default TaskReview