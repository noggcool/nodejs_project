const UserDao = require("../dao/user_dao.js")

const UserService = {
    login(){

    },
    register(req,res,next){
    //获取在请求中传递的注册用户信息
    //传递的key=value的请求信息保存在req.body里
     const {username,password,email}=req.body;//!!!注册请求信息保存在这里，用结构赋值读出
   //还需要再判断之前的用户名是否被注册过
    UserDao.save({username,password,email})
        .then((data)=>{
            res.json({res_code:1,res_error:"",res_body:data});
        })
        .catch((err)=>{
            res.json({res_code:-1,res_error:err,res_body:{}})
        })
    }
};
module.exports = UserService;