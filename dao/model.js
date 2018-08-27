const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/proj_1804');

//用户模型
const User = mongoose.model("user",{
    username:String,
    password:String,
    email:String
});

module.exports={User};