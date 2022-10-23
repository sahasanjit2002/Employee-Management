const mongoose = require('mongoose');
const validator = require('validator');

const prjSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
        minlength: 2
    },
    mngId:{
        type:String
    },
    creationDate:{
        type:Date,
        default: (Date.now()+19800000)
    },
    completionDate:{
        tpe:Date,
        //required: true
    },
    prjDescription:{
        type:String,
        //required: true,
    },
    tasks:[
        {
            taskName:{
                type:String,
                required:true,
                minlength: 2
            },
            taskDescription:{
                type: String,
                required:true
            },
            empID:{
                type:String,
                required:true,
            },
            submissionDate:{
                type:Date
            },
            taskFile: {
                data: String
            },
            accepted:{
                type: Boolean,
                default:false
            },
            rejected:{
                type:Boolean,
                default:false
            },
            finished:{
                type:Boolean,
                default:false
            },
            comment:{
                type:String,
                default:""
            },
            uploadedFileName:{
                type:String
            }
        },
        ]
    },
    {
        'collection':'projectData'
    });
    const project = new mongoose.model('projectData',prjSchema)

module.exports = project;