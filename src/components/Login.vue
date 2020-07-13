<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar-box">
                <img src="../assets/img/logo.png" alt="">
            </div>
            <el-form label-width="0px" class="login-form" :model="form" :rules="rules" ref="loginFormRef">
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-g_my_on" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-password" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item class="login-button">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        form: {
          username: 'admin',
          password: '123456'
        },
        rules: {
          username: [
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      reset () {
        console.log(this)
        this.$refs.loginFormRef.resetFields()
      },
      login () {
        this.$refs.loginFormRef.validate(valid => {
          if (!valid) {
            console.log('表单校验失败')
            return
          }
          const params = new URLSearchParams();
          params.append('username', this.form.username);
          params.append('password', this.form.password);
          this.$http.post('/api/login', this.form)
            .then(res => {
              console.log('接口调用结束', res)
              let { status } = res.data
              console.log(status)
              if (status != 200) {
                console.log('接口调用失败')
              }
            })

        })
      }
    }
  }
</script>

<style scoped>
    @import url('../assets/css/font_login/iconfont.css');

    .login-container {
        background-color: pink;
        height: 100%;
    }

    .login-box {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
        background-color: #ffffff;
        width: 450px;
        height: 300px;
        border-radius: 3px;
    }

    .avatar-box {
        height: 130px;
        width: 130px;
        /*background-color: orange;*/
        border: 1px solid #eeeeee;
        border-radius: 50%;
        padding: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        box-shadow: 0 0 10px #dddddd;
    }

    .avatar-box img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        border: 1px solid #eeeeee;
        background-color: #eeeeee;
    }

    .login-form {
        position: absolute;
        bottom: 0;
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
    }

    .login-button {
        display: flex;
        justify-content: flex-end;
    }
</style>
