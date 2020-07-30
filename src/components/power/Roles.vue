<template>
    <div>
        <!--    导航栏-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--    卡片视图区-->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button type="primary" @click="addRoleDialog = true">添加角色</el-button>
                </el-col>
            </el-row>
            <!--            //表格区-->
            <el-table
                    :data="roles"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="slope">
                        <el-card>
                            <el-row :class = "['bottom',index==0? 'top':'']"  v-for="(roleItem,index) in slope.row.children" :key="roleItem.id">
<!--                                第一列，一级权限-->
                                <el-col :span="5">
                                    <el-tag class="role-tag" closable @close="removeRightById(slope.row,roleItem.id)">{{roleItem.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
<!--                                第二列，二级和三级权限-->
                                <el-col :span="19">
                                    <el-row :class = "[i2==0? '':'top']"  v-for="(role2Item,i2) in roleItem.children" :key="role2Item.id">
                                        <!--                                第一列，二级权限-->
                                        <el-col :span="6">
                                            <el-tag class="role-tag" type="success" closable @close="removeRightById(slope.row,role2Item.id)">{{role2Item.authName}}</el-tag>
                                            <i class="el-icon-caret-right"></i>
                                        </el-col>

                                        <el-col :span="18">
                                            <el-tag class="role-tag" type="warning" closable v-for="(role3Item,i3) in role2Item.children" :key="role3Item.id" @close="removeRightById(slope.row,role3Item.id)">{{role3Item.authName}}</el-tag>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column
                        prop="roleName"
                        label="角色名称">
                </el-table-column>
                <el-table-column
                        prop="roleDesc"
                        label="角色描述">
                </el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="slope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="openUpdateRoleDialog(slope.row.id)">编辑
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(slope.row.id)">
                            删除
                        </el-button>
                        <!--                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">-->
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                        <!--                        </el-tooltip>-->
                    </template>
                </el-table-column>
            </el-table>
            <!--            分页区-->
            <!--            <el-pagination-->
            <!--                    @size-change="handleSizeChange"-->
            <!--                    @current-change="handleCurrentChange"-->
            <!--                    :current-page="params.pagenum"-->
            <!--                    :page-sizes="[1, 2,3 , 4]"-->
            <!--                    :page-size="params.pagesize"-->
            <!--                    layout="total, sizes, prev, pager, next, jumper"-->
            <!--                    :total="totalpage">-->
            <!--            </el-pagination>-->

            <el-dialog title="添加角色" :visible.sync="addRoleDialog" width="50%" @close="closeAddRoleDialog">
                <el-form :model="addRoleForm" :rules="addRoleFormRules" label-width="100px" ref="addRoleForm">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="addRoleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="addRoleForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog title="编辑角色" :visible.sync="updateRoleDialog" width="50%" @close="closeAddRoleDialog">
                <el-form :model="addRoleForm" :rules="addRoleFormRules" label-width="100px" ref="addRoleForm">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="addRoleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="addRoleForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="updateRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateRole">确 定</el-button>
            </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'Roles',
    data () {
      return {
        roles: [],
        addRoleDialog: false,
        updateRoleDialog: false,
        addRoleForm: {
          roleId: '',
          roleName: '',
          roleDesc: ''
        },
        addRoleFormRules: {
          roleName: [
            {
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          roleDesc: [
            {
              max: 5,
              message: '长度小于5个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created () {
      this.getRoleList()
    },
    methods: {
      getRoleList () {
        this.$http.get('/api/roles')
          .then(res => {
            if (res.data.meta.status !== 200) {
              return this.$message.error('查询角色列表失败')
            }
            this.roles = res.data.data
          })
      },
      addRole () {
        this.$refs.addRoleForm.validate(valid => {
          if (!valid) {
            return
          }
          this.$http.post('/api/roles', this.addRoleForm)
            .then(res => {
              console.log('添加角色返回结果：', res)
              if (res.data.meta.status !== 201) {
                return this.$message.error('添加角色失败')
              }
              this.$message.success('添加角色成功')
              this.getRoleList()
              this.addRoleDialog = false
            })
        })
      },
      openUpdateRoleDialog (id) {
        this.$http.get(`/api/roles/${id}`)
          .then(res => {
            console.log('获取角色信息结果：', res)
            if (res.data.meta.status !== 200) {
              return this.$message.error('获取角色信息失败')
            }
            this.addRoleForm = res.data.data
            this.updateRoleDialog = true
          })
      },
      updateRole () {
        this.$refs.addRoleForm.validate(valid => {
          console.log(valid)
          if (!valid) {
            return false
          }
          this.$http.put(`/api/roles/${this.addRoleForm.roleId}`, this.addRoleForm)
            .then(res => {
              if (res.data.meta.status !== 200) {
                return this.$message.error('更新角色失败')
              }
              this.$message.success('更新角色成功')
              this.getRoleList()
              this.updateRoleDialog = false
            })
        })
      },
      deleteRole(id){
        this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$http.delete(`/api/roles/${id}`)
        }).then(res=>{
          if (res.data.meta.status !== 200) {
            return this.$message.error('删除失败')
          }
          this.$message.success('删除成功')
          this.getRoleList()
        }).catch(() => {
          // this.$message.error('删除失败')
        });
      },
      closeAddRoleDialog () {
        this.$refs.addRoleForm.resetFields()
      },
      removeRightById(role, rightId){
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`/api/roles/${role.id}/rights/${rightId}`)
              .then(res=>{
                if (res.data.meta.status !== 200) {
                  return this.$message.error('删除权限失败')
                }
                role.children = res.data.data
                this.$message.success('删除权限成功')
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

    .role-tag {
        margin: 7px;
    }
    .bottom {
        border-bottom: 1px solid #eeeeee;
    }
    .top{
        border-top: 1px solid #eeeeee;
    }
    .el-row{
        display: flex;
        align-items: center;
    }
</style>
