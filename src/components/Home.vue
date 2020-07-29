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
            <el-aside :width="menuWidth">
                <div class="menu-collapse" @click='menuCollapse'>|||</div>
                <el-menu
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :unique-opened="true"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :router="true"
                        :default-active="activePath">
                    <el-submenu :index="menuItem.id+''" v-for="menuItem in menuList" :key="menuItem.id">
                        <template slot="title">
                            <i :class="icons[menuItem.id]"></i>
                            <span>{{menuItem.authName}}</span>
                        </template>
                        <el-menu-item :index="item.path+''" v-for="item in menuItem.children" :key="item.id"
                                      @click="saveActivePath(item.path)">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--            主体-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        menuList: [],
        icons: {
          '125': 'iconfont icon-yonghu',
          '103': 'iconfont icon-ic_opt_feature',
          '101': 'iconfont icon-houtaishangpinguanli',
          '102': 'iconfont icon-dingdanguanli',
          '145': 'iconfont icon-icon-test'
        },
        isCollapse: false,
        activePath: ''
      }
    },
    computed: {
      menuWidth () {
        return (this.isCollapse ? 56 : 200) + 'px'
      }
    },
    methods: {
      loginout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      menuCollapse () {
        this.isCollapse = !this.isCollapse
      },
      saveActivePath (path) {
        window.sessionStorage.setItem('activePath', path)
        this.activePath = path
      }
    },
    created () {
      console.log('初始化菜单')
      this.$http.get('/api/menus')
        .then(res => {
          console.log('菜单接口返回结果为：', res)
          const { data } = res
          if (data.meta.status !== 200) {
            return this.$message.error(data.meta.msg)
          }
          this.menuList = data.data
        })
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  }
</script>
<style scoped>
    @import url('../assets/css/font_menu/iconfont.css');

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

    .iconfont {
        margin-right: 10px;
    }

    .el-aside .el-menu {
        border-right: 0px;
    }

    .menu-collapse {
        text-align: center;
        letter-spacing: 0.2em;
        background-color: #3a3f4b;
        cursor: pointer;
    }
</style>
