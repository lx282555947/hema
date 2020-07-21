<template>
    <div>
        <!--    导航栏-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--    卡片视图区-->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" v-model="params.query" clearable @clear="reset">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addUserDialog = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!--            //表格区-->
            <el-table
                    :data="users"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="角色">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="slope">
                        <el-switch
                                v-model="slope.row.mg_state"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="userStateChange(slope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="slope">
                        <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--            分页区-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.pagenum"
                    :page-sizes="[1, 2,3 , 4]"
                    :page-size="params.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalpage">
            </el-pagination>
        </el-card>
        <el-dialog title="添加用户" :visible.sync="addUserDialog" width="50%">
            <el-form :model="addUserForm" :rules="addUserFormRules" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="addUserDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'Users',
    data () {
      // 自定义邮箱验证
      const checkEmail = (rule, value, callback) => {
        const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!emailReg.test(value)) {
          return callback(new Error('请输入合法的邮箱'))
        }
        callback()
      }
      // 自定义电话号验证
      const checkPhone = (rule, value, callback) => {
        const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!phoneReg.test(value)) {
          return callback(new Error('请输入合法的手机号'))
        }
        callback()
      }
      return {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 2
        },
        totalpage: 0,
        users: [],
        addUserDialog: false,
        addUserForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        addUserFormRules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              trigger: 'blur'
            }
          ],
          mobile: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              validator: checkPhone,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created () {
      this.getUserList()
    },
    methods: {
      getUserList () {
        this.$http
          .get('/api/users', { params: this.params })
          .then(res => {
            const { data: response } = res
            if (response.meta.status !== 200) {
              return this.$message.error(response.meta.msg)
            }
            console.log(response.data)
            this.totalpage = response.data.total
            this.params.pagenum = response.data.pagenum
            this.users = response.data.users
          })
      },
      // 监听pageSize
      handleSizeChange (newPageSize) {
        console.log(newPageSize)
        this.params.pagesize = newPageSize
        this.getUserList()
      },
      // 监听pagenum
      handleCurrentChange (newPageNum) {
        console.log(newPageNum)
        this.params.pagenum = newPageNum
        this.getUserList()
      },
      userStateChange (userInfo) {
        console.log(userInfo)
        // 更新用户状态
        this.$http.put(`/api/users/${userInfo.id}/state/${userInfo.mg_state}`)
          .then(res => {
            console.log(res)
            if (res.data.meta.status !== 200) {
              userInfo.mg_state = !userInfo.mg_state
              return this.$message.error(res.data.meta.msg)
            }
            console.log('更新状态成功')
          })
      },
      search () {
        this.getUserList()
      },
      reset () {
        this.getUserList()
      }
    }
  }
</script>

<style scoped>

</style>
