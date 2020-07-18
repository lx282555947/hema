<template>
    <el-container class="home-container">
        <!--        头部-->
        <el-header>
            <div>
                <img src="../assets/img/horse.png" alt="">
                <span>黑马电商后台订单系统</span>
            </div>
            <el-button type="info" @click="loginout">登出</el-button>
        </el-header>
        <el-container>
            <!--            边栏-->
            <el-aside width="200px">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="1-4-1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--            主体-->
            <el-main>Main</el-main>
        </el-container>
    </el-container>

</template>

<script>
  export default {
    name: 'Home',
    methods: {
      loginout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
    .el-header {
        background-color: #b5c0cf;
        display: flex;
        justify-content: space-between;
        padding-left: 0px;
        align-items: center;
    }

    .el-header div {
        width: 300px;
        height: 60px;
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: 20px;
    }

    .el-header div img {
        height: 100%;
    }

    .el-header div span {
        margin-left: 10px;
    }

    .el-aside {
        background-color: #d5dce5;
    }

    .el-main {
        background-color: #eaeef2;
    }

    .home-container {
        height: 100%
    }
</style>
