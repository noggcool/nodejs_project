function RegisterModal(){
 this.createModal(),
  this.addListener()
}
RegisterModal.template=`
<!-- Modal 注册-->
<div class="modal fade" id="registerModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span>&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">用户注册说明</h4>
      </div>
      <div class="modal-body">
        <form id="form-register">
          <div class="form-group">
            <label for="registerUsername">用户名</label>
            <input type="text" class="form-control" id="registerUsername" placeholder="用户名"name="username">
          </div>
          <div class="form-group">
            <label for="registerPassword">密码</label>
            <input type="password" class="form-control" id="registerPassword" placeholder="密码"name="password">
          </div>
          <div class="form-group">
            <label for="registerConfPassword">确认密码</label>
            <input type="password" class="form-control" id="registerConfPassword" placeholder="密码"name="password_again">
          </div>
          <div class="form-group">
            <label for="registerEmail">邮箱</label>
            <input type="email" class="form-control" id="registerEmail" placeholder="邮箱"name="email">
          </div>
          <div class="form-group input-group">
            <label for="registerCode">验证码</label>
            <input type="text" id="registerCode" placeholder="验证码" class="form-control"name="yanzhengma">
           <span class="input-group-addon code-info">信息</span>
            <p class="help-block code-img">这是个验证码</p>
          </div>


        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary btn-register">注册</button>
      </div>
    </div>
  </div>
</div>
`;
$.extend(RegisterModal.prototype,{
    createModal(){
        $(RegisterModal.template).appendTo("body");
    },
    addListener(){
      //失去焦点校验验证码
      $("#registerCode").on("blur",this.verifyHandler);
      $(".btn-register").on("click",this.handle)
    },
    //校验验证码
    verifyHandler(){
        //输入的验证码
        var code = $("#registerCode").val();
        //ajax
        $.getJSON("/captcha/verify",{code},(data)=>{
            console.log(data);
            if(data.res_code ===1){
                $(".code-info").text("正确")
            }else{
              $(".code-info").text("错误")
            }
        })
    },
    handle(){
      console.log($("#registerUsername").val());
     var data = $("#form-register").serialize();
     console.log(data)
      $.post("/users/register",data,(resDate)=>{//??????users在哪？？？
       console.log(resDate)
      },"json")
      // .done(()=>{//这一部分要根据服务器返回的数据判断，成功了才能hide
      //   $("#registerModal").modal("hide");
      // })
    }
    
})
//new RegisterModal();