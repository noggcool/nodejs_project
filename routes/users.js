const express = require('express');
const router = express.Router();
const UserService = require("../services/user_service.js")
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//用户登录 http://localhost:3000/users/login 访问users目录下的资源
router.post("/login",function(req,res,next){
  res.send("用户登录处理")
});
//用户注册
router.post("/register",UserService.register);

module.exports = router;
