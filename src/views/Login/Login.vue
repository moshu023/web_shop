<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="http://masteryhh.oss-cn-beijing.aliyuncs.com/blog_img/20210317161951.png" alt="avatar">
      </div>
    <!--登录表单区域-->
      <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules">
        <!--用户名表单-->
        <el-form-item prop="username">
            <el-input type="username" v-model="loginForm.username" prefix-icon="iconfont icon-yonghu" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <!--密码表单-->
        <el-form-item v-if="visible"  prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入登录密码">
            <i slot="prefix" class="el-input__icon iconfont icon-zu"></i>
            <i slot="suffix" title="显示密码" @click="changePassword(true)" style="cursor:pointer;"
               class="el-input__icon iconfont icon-yincangmima"></i>
          </el-input>
        </el-form-item>
        <el-form-item v-else prop="password">
          <el-input type="text" v-model="loginForm.password" placeholder="请输入登录密码">
            <i slot="prefix" class="el-input__icon iconfont icon-zu"></i>
            <i slot="suffix" title="隐藏密码" @click="changePassword(false)" style="cursor:pointer;"
               class="el-input__icon iconfont icon-xianshimima"></i>
          </el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-row>
            <el-button @click="login" type="primary" round>登录</el-button>
            <el-button @click="resetLoginForm" type="info" round>重置</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单数据区域
      loginForm: {
        username: 'admin',
        password: '123456',
        res: ''
      },
      visible: true,
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '用户名称不能为空！', trigger: 'blur' },
          { min: 5, max: 12, message: '用户长度在 5 到 12 个字符!', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '登录密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 通过点击此按钮，重置表单数据
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
      console.log('success')
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)，这里valid是布尔值，用来判断提交的表单信息是否合法
        if (!valid) {
          return
        }
        // 只要真实返回的信息，解包信息，把data重命名为res,
        const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(result)
        if (res.meta.status !== 200) {
          return this.$message.error('用户名或密码错误，登录失败！请再试一次叭~')
        }
        this.$message.success('登录成功！欢迎使用本系统~')
        // 为了方便用户访问系统，所以将token保存到sessionStorage里面，只维持在会话期间有效
        window.sessionStorage.setItem('token', res.data.token)
        //  然后通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.replace('/home')
      })
    },
    changePassword (flag) {
      this.visible = !flag
      if (this.visible === false) {
        console.log('false')
      } else {
        console.log('true')
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_container {
  //background-image: url("");
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  background-image: url("http://masteryhh.oss-cn-beijing.aliyuncs.com/blog_img/1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .login_box{
    position: absolute;
    text-align: center;
    line-height: 100px;
    margin: 0 auto;
    height: 300px;
    width: 450px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50px;
    background: rgba(0, 0, 0, .2);
    box-shadow:  20px 20px 60px #b3b0b0,
      -20px -20px 60px #f3eeee;

    .avatar_box {
      height: 130px;
      width: 130px;
      border-radius: 50%;
      border: 3px solid #eee;
      padding: 10px;
      box-shadow: 0 0 10px #595959;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 50%);
      top: -50%;
      background-color: #D3CFCF;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
