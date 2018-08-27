//把整个导航头作为一个对象，包括布局结构、事件处理等各种
/*
头部对象构造函数,class也可以
不用class，也可以用构造函数+原型
*/
function Header(){
  this.createDom();
  this.createModal();
  this.addListener();
}
// Header.prototype.add = function(){}
//下面会替换上面，所以用$.extend去拓展
// Header.prototype = {}
//头部导航模板字符串
Header.template = `
<!-- 导航条 -->
<div class="container">
  <nav class="navbar navbar-default navbar-inverse">
    <div class="container-fluid ">
      <!-- Brand and toggle get grouped for better mobile display -->
<div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">职位管理系统</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="/index.html">首页
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li>
            <a href="/html/position.html">职位管理</a>
          </li>

        </ul>

        <ul class="nav navbar-nav navbar-right not-login">
          <li data-toggle="modal" data-target="#loginModal" class="link-login">
            <a href="#">登录</a>
          </li>
          <li data-toggle="modal" data-target="#registerModal" class="link-register">
            <a href="#">注册</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right login-success hide">
          <li>
            <a href="#">你好，xxx</a>
          </li>
          <li>
            <a href="#">注销</a>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>

  <div class="row">
    <div class="col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2 alert alert-info" role="alert">欢迎使用职位管理系统</div>
    <!--如果宽度太宽，用一个容器包装起来？-->
  </div>
</div>
`;
/*
*原型
*/
$.extend(Header.prototype, {
	// 创建DOM元素并渲染
	createDom() {
		$(Header.template).appendTo("header");
	},
	// 创建模态框
	createModal() {
		new LoginModal();
		new RegisterModal();
	},
	// 注册事件监听
	addListener() {
		$(".link-login,.link-register").on("click", this.genCaptchaHandler)
	},
	// 生成验证码
	genCaptchaHandler() {
		$.get("/captcha/gencode", (data)=>{
			$(".code-img").html(data);
		},"text");
	}
});

// 创建头部对象实例
new Header();