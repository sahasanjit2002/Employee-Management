const express = require("express");
require("./db/conn")// requiring conn.js file
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const fs=require("fs")
const employee = require("./models/empModel");
const manager = require("./models/mngModel")
const project = require("./models/taskModel");
const taskfile = require("./models/taskFileModel");
const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      /*Appending extension with original name*/
      cb(null,Date.now()+ file.originalname ) 
    }
  })
  
  var upload = multer({ storage: storage });



const cors = require('cors')
app.use(cors())

var currentUser;
var currentPost;
// using json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// setting the view engine
const hbs = require("hbs");
const { decode } = require("punycode");

const templatePath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')
hbs.registerPartials(partialPath);
app.set("view engine", "hbs")
app.set("views", templatePath)




// setting port number
const port = process.env.PORT || 8000


app.get("", (req, res) => {
    if (currentUser === undefined || currentUser == null || currentUser.length <= 0) {
        res.render("home", {
            name: "Honorable Guest"
        });
    } else {
        res.render("home", {
            name: currentUser.name
        });
    }

})
app.get("/empRegister", (req, res) => {
    res.render("employeeRegister")
})
app.get("/mngRegister", (req, res) => {
    res.render("managerRegister");
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/viewProfile", async (req, res) => {
    try {
        if (currentUser === undefined || currentUser == null || currentUser.length <= 0) {
            res.render("404_User")
        } else {
            res.render("viewProfile", {
                currentP: currentUser,
                position: currentPost.toString()
            })
        }
    } catch (error) {
        res.send(error)
    }
})
/*app.get("/getUsers", async (req, res) => {
    const employess = await employee.find({})
    res.send(employess);
})*/
app.get("/empUSer", (req, res) => {
    res.render("userView");
})
app.get("/project", (req, res) => {
    res.render("createProject");
})
app.get("/task", (req, res) => {
    res.render("insertTask")
});



/*app.post("/initProject", async (req, res) => {
    console.log(req.body.name);
    console.log(currentPost)
    if (currentPost == "mng") {
        try {
            const prog = new project({
                name: req.body.name,
                completionDate: req.body.completionDate,
                prjDescription: req.body.description,
                mngId: 
            })

            const result = await prog.save()
            console.log("data Submitted");
            res.status(201).redirect("/project");
        } catch (e) {
            res.status(400).send(e);
        }
    }
    else {
        res.send("user need to be manager");
    }
})*/




















/*app.patch("/task", async (req, res) => {
    try {
        const taske = {
            taskName: "Task 2",
            taskDescription: "task Description",
            empID: "012549",
            submissionDate: "10/12/2023"
        }
        const taskse = await project.findByIdAndUpdate("629dcbf89b190910ca4c666f", { "$push": { tasks: taske } })
        console.log("datasubmitted succesfully")
        res.send(taske)
    } catch (err) {
        console.log(err)
        res.send("error")
    }
})*/

app.patch("/tastStat", async (req, res) => {
    try {
        const task = await project.updateOne(
            {
                _id : "629dcbf89b190910ca4c666f", 
            },
            {"$set" : 
                {
                        "tasks.$[o].taskName" : "This is a test Task"
                }
            },
            {
                arrayFilters : [
                    {
                        "o.taskName":"Task 0"
                    }
                ]
            }
            )
        res.send(task)
        }catch (err) {
            res.send("error")
        }

    })

app.post("/empUser",upload.none(), async (req, res) => {
    try {
        if (req.body.password === req.body.cPassword) {
            const emp = new employee({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                experience: req.body.exp,
                address: req.body.address,
                department: req.body.department,
            })
            const result = await emp.save()
            console.log("data Submitted");
            return res.json({status:"OK"})
        }
        else {
            return res.json({status:"Failed",msg:"Password Mismatch"})
        }
    } catch (e) {
        return res.json({status:"false",error:e});
    }
})



//post manager
app.post("/mngUser",upload.none(),async (req, res) => {
    try {
        if (req.body.password === req.body.cPassword) {
            const mng = new manager({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                experience: req.body.exp,
                address: req.body.address,
                department: req.body.department,
            })
            const result = await mng.save()
            console.log("manager data submitted")
            return res.json({status:"OK"})
        }
        else {
            return res.json({status:"Failed",msg:"Password Mismatch"})
        }
    } catch (e) {
        return res.json({status:"Failed",error:e});
    }
})

// user and manager login
app.post("/userLogin", async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const userSelect = req.body.userSelect
        if (userSelect == "mng") {
            //res.send(req.body.Username);
            const dbUsername = await manager.findOne({ username: username })
            if (dbUsername.password == password) {
                currentUser = dbUsername;
                currentPost = "mng"
                res.render("welcomePage", {
                    name: currentUser.name
                })
            }
            else {
                res.send("invalid credentials details");
            }
        }
        else {
            const dbUsername = await employee.findOne({ username: username })
            if (dbUsername.password == password) {
                currentUser = dbUsername;
                currentPost = "emp"
                res.render("welcomePage", {
                    name: currentUser.name
                })
            } else {
                console.log("invalid credentials details");
            }
            console.log(dbUsername)
        }
    } catch (e) {
        res.status(500).send("invalid credential details");
    }

})


//new Node



app.post('/login', async(req,res)=>{
    var dbUsername
    if(req.body.userSelect === "mng")
    {
        dbUsername = await manager.findOne({ username: req.body.username , password: req.body.password})
    }else{
        dbUsername = await employee.findOne({ username: req.body.username ,password: req.body.password})
    }
    if(dbUsername)
    {
        const token = jwt.sign({
            id: dbUsername._id,
            post: req.body.userSelect
        },'DeK#34@148.7845')
         res.json({status : 'Ok',user: token})}
    else{
        res.json({status : "false"})}
    
})


app.get('/userProfile',async(req,res)=>{
    const token = req.headers['x-access-token']

    try{
        var users = {}
        const decoded = jwt.verify(token,'DeK#34@148.7845')
        if(decoded.post === 'mng')
        {
            users = await manager.findOne({_id:decoded.id},{password:0}) //sending user data
        }else{
            users = await employee.findOne({_id:decoded.id},{password:0})
        }
        return res.json({status: 'ok' , user: users})
    }catch(err)
    {
        return res.json({status:'not Ok',error:'invalid token'});
    }

})
app.post("/initProject", async (req, res) => {
        try {
            const prog = new project({
                name: req.body.progName,
                completionDate: req.body.completionDate,
                prjDescription: req.body.description,
                mngId: req.body.mngID
            })

            const result = await prog.save()
            console.log("data Submitted");
            return res.json({status:"OK"})
        } catch (e) {
            res.status(400).send(e);
        }
})
app.get("/projectDetails",async(req,res)=>{
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token,'DeK#34@148.7845')
        const id =decoded.id
        if(decoded.post === 'mng')
        {
            var progDetails = await project.findOne({mngId: id})
            if(progDetails)
            {
                return res.json({status:"success",progData:progDetails})
            }
            else{
                return res.json({status:"failed",error:"Seems like you have not created a project yet"})
            }
        }else{
            return res.json({status:"failed",error:"User needs to be a manager to view project"})
        }
    }catch(e)
    {
        console.log(e)
        return res.json({status: "failed", error:"user need to sign in to continue"})

    }
})


app.patch("/task",async (req, res) => {
    try {
        const taske = {
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            empID: req.body.employeeID,
            submissionDate: req.body.SubmissionDate
        }
        const employees = await employee.findByIdAndUpdate({_id:req.body.employeeID},{
            $set:{
                status : false,
                projectID : req.body.progID,
            }})
        const taskse = await project.findByIdAndUpdate(req.body.progID, { "$push": { tasks: taske } })
        console.log("datasubmitted succesfully")
        return res.json({status:"OK"})
    } catch (err) {
        return res.json({status:"False"})
    }
})

app.get("/getUsers",async(req,res)=>{
    const Employee = await employee.find({})
    return res.json({status:"ok",emp:Employee})
})
app.post("/getTask",async(req,res)=>{
    try{
        const Task = await project.findById({_id:req.body.id});
        if(Task)
        {
            const Man = await manager.findOne({_id:Task.mngId},{name:1,_id:0})
            return res.json({status:"Success",Task,Man});
        }else{
            return res.json({status:"Failed"})
        }
    }catch(err){
        return res.json({status:"False"})
    }
    
})

app.post("/viewTask",async(req,res)=>{
    return res.json({ret:req.body.id})
})

app.patch("/setComment",async(req,res)=>{
    try {
            const task = await project.updateOne(
            {
                _id : req.body.id, 
            },
            {"$set" : 
                {
                        "tasks.$[o].comment" : req.body.comment,
                        "tasks.$[o].accepted": true
                }
            },
            {
                arrayFilters : [
                    {
                        "o._id": req.body.taskID
                    }
                ]
            }
            )
        res.send(task)
        }catch (err) {
            res.send("error")
        }
})

app.patch("/submitTask",upload.single("taskFile"),async(req,res)=>{
    //console.log(req.body.taskId)
    try {
        var ff = req.file.filename;
        //console.log(ff)

        const task = await project.updateOne(
            {
                _id : req.body.id, 
            },
            {"$set" : 
                {
                        "tasks.$[o].taskFile":ff

                }
            },
            {
                arrayFilters : [
                    {
                        "o._id": req.body.taskId
                    }
                ]
            }
            )
            //console.log(task)
        return res.json({status:"OK"})
    }catch (err) {
        return res.json({status:"failed"})
    }
})
app.patch("/accept",async(req,res)=>{
    //console.log(req.body)
    try {
        const task = await project.updateOne(
            {
                _id : req.body.id, 
            },
            {"$set" : 
                {
                        "tasks.$[o].accepted": true,
                        "tasks.$[o].rejected": false,
                }
            },
            {
                arrayFilters : [
                    {
                        "o._id": req.body.taskID
                    }
                ]
            }
            )

        return res.json({status:"OK"})
    }catch (err) {
        return res.json({status:"failed"})
    }
})
app.patch("/reject",async(req,res)=>{
    //console.log(req.body)
    try {
        const task = await project.updateOne(
            {
                _id : req.body.id, 
            },
            {"$set" : 
                {
                        "tasks.$[o].rejected": true,
                        "tasks.$[o].accepted": false
                }
            },
            {
                arrayFilters : [
                    {
                        "o._id": req.body.taskID
                    }
                ]
            }
            )

        //console.log(task)
        return res.json({status:"OK"})
    }catch (err) {
        return res.json({status:"failed"})
    }
})


app.post("/getTaskFile",async(req,res)=>{
    console.log(req.body)
    try{
       return res.download(path.join(`./uploads/`+req.body.filename) )
    }catch(err)
    {
        return res.json({status:"failed",errMsg : err})
    }
})

app.listen(port, () => {
    console.log(`Server Listening to port ${port}`);
})