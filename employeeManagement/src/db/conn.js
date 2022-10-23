const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/employeeManagement",{ useNewUrlParser: true },{ useUnifiedTopology: true },{useFindAndModify:false})
.then( () => console.log("DB connection Successful"))
.catch( (err)=> console.log(err));