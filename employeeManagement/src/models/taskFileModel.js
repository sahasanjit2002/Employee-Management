const mongoose = require('mongoose');
const validator = require('validator');

const taskFile = new mongoose.Schema({
    taskId:{
        type:String,
        required:true
    },
    file:{
        data:Buffer,
        contentType: String,
    }
    },
    {
        'collection':'taskFile'
    });
    const taskfile = new mongoose.model('taskFile',taskFile)

module.exports = taskfile;