const UserDao = require("../dao/user_dao.js")
const bcrypt = require("bcrypt");
const UserService = {
    login(req,res,next){
       
            //获取登录时的用户名与密码
         const {username,password}=req.body;
        
        //根据用户名查询用户信息
       UserDao.find({username})//查询出用户信息    //??????????????????????????
        .then(data=>{
            if(data.length ===1){//存在该用户
                //比较密码是否正确
            }else{
                res.send(data);
                console.log(data)
            }
        })
        .catch();
       
    },
    register(req,res,next){
    //获取在请求中传递的注册用户信息
    //传递的key=value的请求信息保存在req.body里
     const {username,password,email}=req.body;//!!!注册请求信息保存在这里，用结构赋值读出
   //还需要再判断之前的用户名是否被注册过

   //对密码加密
   const passCrypt = bcrypt.hashSync(password,10);//10是进行几轮加密
   console.log(passCrypt);
   
   UserDao.save({username,password:passCrypt,email})
        .then((data)=>{
            res.json({res_code:1,res_error:"",res_body:data});
        })
        .catch((err)=>{
            res.json({res_code:-1,res_error:err,res_body:{}})
        })
    }
};
module.exports = UserService;