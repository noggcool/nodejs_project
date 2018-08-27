/**
 * 登录模态框
 */
function LoginModal(){
    this.createDom();
    this.addListener();
};
LoginModal.template=`
<!-- Modal 登录-->
<div class="modal fade" id="loginModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">用户登录说明</h4>
      </div>
      <div class="modal-body">
          <form class="login-form">
              <div class="form-group">
                <label for="loginUsername">用户名</label>
                <input type="text" class="form-control"name="username" id="loginUsername" placeholder="用户名">
              </div>
              <div class="form-group">
                <label for="loginPassword">密码</label>
                <input type="password" class="form-control"name="password" id="loginPassword" placeholder="密码">
              </div>
              <div class="form-group">
                <label for="loginCode">验证码</label>
                <input type="text" id="loginCode"placeholder="验证码" class="form-control">
                <p class="help-block code-img">这是个验证码</p>
              </div>
             
             
            </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary btn-login">登录</button>
      </div>
    </div>
    
  </div>
</div>
`;
$.extend(LoginModal.prototype,{
    //创建DOM元素并渲染
    createDom(){
        $(LoginModal.template).appendTo("body")
    },
    addListener(){//维护，登录事件监听
        $(".btn-login").on("click",this.loginHandle)
    },
    loginHandle(){//点击登录按钮事件按钮后要做的事
      //待传递到服务器的用户登录数据
      var data = $(".login-form").serialize();
      //ajax提交登录处理
      $.post("/users/login",data,(resData)=>{
        console.log(resData);
    }).done(()=>{
      $("#loginModal").modal("hide");//隐藏的方法，隐藏模态框
     //  $("#loginModal").hide();//这种hide不能让模态框hide。hide只能让当前的loginModal隐藏，但是点击登录后还有其他的布局结构出现就不能隐藏
    }).done(()=>{
      $(".login-success").removeClass("hide").siblings(".not-login").remove();
      //删了再找兄弟就找不到了
    //  $(".not-login").remove().siblings(".login-success").removeClass("hide")
    });
  }
});
// new LoginModal();         //为什么去掉new就会报this.crateDom is not a function,因为在header.js里使用了创建这2者的方法，所以重复创建就会报错