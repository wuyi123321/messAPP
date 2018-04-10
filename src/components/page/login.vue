<style scoped>
  .login{
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #009688;
    flex-direction: column;
    align-items: center;
  }
  input{
    outline:none;
  }
  .login .head{
    width: 100%;
    height: 35%;
    color: #fff;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login .content{
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .login .content .form{
    width: 100%;
    border: solid 1px #eee;
    border-radius: 5px;
    background-color: #fff;

  }
  .form input{
    border: none;
    width: 100%;
    height: 100%;
    padding-left: 10px;
  }
  .form .username{
    height: 45px;
    border-bottom: solid 1px #888;
  }

  .form .password{
    height: 45px;
  }
  .login .content .but{
    margin-top: 25px;
  }
  .bottom{
    margin-top: 10px;
    margin-left: 20px;
    width: 85%;
    height: 30px;
    display: flex;
    align-items: center;
    color: #fff;
  }
</style>
<template>
  <div class="login">
       <div class="head">设备管理APP</div>
       <div class="content">
         <div class="form">
            <div class="username">
              <!--<mu-text-field hintText="提示文字"/>-->
              <input placeholder="用户名" v-model="userName"/>
            </div>
            <div class="password">
              <input placeholder="密码" v-model="password" type="password"/>
            </div>
         </div>
         <div class="but">
           <mu-raised-button label="登录" fullWidth style="background-color: #00bb88;
                  color: #fff;border-radius: 5px;height: 40px;font-size: 18px" @click="login"/>
         </div>

       </div>
       <div class="bottom">
         <input type="checkbox" v-model="checked"/><span style="margin-left: 10px;position: relative;top: -1px">记住密码</span>
       </div>

  </div>
</template>
<script>

  export default {
    data () {
      return {
        userName:"",
        password:"",
        checked:true,
        empNo:""
      }
    },
    mounted:function () {
          this.userName = localStorage.getItem('mess_usename');
          this.password = localStorage.getItem('mess_password');
    },

    methods: {
//userid:'test',pwd:'test,.2016'
      login:function () {
        var vm = this;
        if(this.userName == ""){
          this.$message({
            message: '请输入姓名',
            type: 'warning'
          });
          return 0
        }
        if(this.password == ""){
          this.$message({
            message: '请输入密码',
            type: 'warning'
          });

          return 0
        }
        $.ajax({
          url: vm.path+"loginforapp.action",
          dataType: "json",
          data:{userid:vm.userName,pwd:vm.password},
          type: "get",
          success: function(data) {
            console.log(data);
            if(data.comResult.result == "TRUE"){
              vm.empNo = data.emp.empNo;
              localStorage.setItem("mesUsermess",JSON.stringify(data.emp));
              vm.succe();
            }else {
              vm.$message({
                message:data.comResult.message,
                error: 'warning'
              })
            }
          },
          error: function() {

          }
        });
      },
      succe:function () {
        if(this.checked==true){
          localStorage.setItem("mess_password",this.password)
        }
        else {
          localStorage.removeItem("mess_password");
        }
          localStorage.setItem("mess_usename",this.userName);
          localStorage.setItem("empNo",this.empNo);

           this.$router.replace({ path: '/index'});
      }

    }
  }
</script>
