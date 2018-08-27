const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//引入express-session中间件
const session = require("express-session");

//路由中间件，接口的东西的配置
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const captchaRouter = require('./routes/captcha.js');

//创建Express应用实例
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("xm"));
//session配置，使用express-session中间件
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'xm',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:45*60*1000 }
}))

//指明静态资源存放的位置，如果静态资源找不到才去使用路由中间件
app.use(express.static(path.join(__dirname, 'public')));
//使用路由中间件
app.use('/', indexRouter);//  
app.use('/users', usersRouter);  // /user/regis /user/login，访问users目录下的资源，用usersRouter.访问/users用到'./routes/users'里的资源
app.use('/captcha',captchaRouter);//访问captchaRouter目录下的资源
//访问/captcha下的资源，到这个captchaRouter路由里去
//var captchaRouter = require('./routes/captcha.js');
//？？？为什么访问的路径就是localhost:3000/captcha/gencode


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
