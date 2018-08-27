const express = require('express');
const router = express.Router();
const Captch = require("../services/captcha.js");
/* 生成验证码 */
router.get('/gencode',Captch.genCaptcha);

//校验验证码
router.get("/verify",Captch.verifyCaptcha);
module.exports = router;
//在app.js里也引用和use了路由中间件，所以新加了验证码路由中间件
//就还要去app.js里修改