const mongoose = require('mongoose');
const validator = require('validator');

const mngSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    phone:{
        type:Number,
        min:1000000000,
        max:9999999999,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique:[true,"Email Id Already Present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    username:{
        type: String,
        required: true,
        unique: [true,"Username Already Present"]
    },
    experience:{
        type: Number,
        default: 0
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    department:{
        type:String,
        required:true,
        enum:["Front-End","Back-end","Tester","Designer","Developer"]
    },
    profileImg: {
        data: Buffer,
        contentType: String,
    },},
    {
        'collection':'managerData'
    });
    const manager = new mongoose.model('managerData',mngSchema)

module.exports = manager;