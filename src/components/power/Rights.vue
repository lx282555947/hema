<template>
    <div>
        <!--    导航栏-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--            //表格区-->
            <el-table
                    :data="rights"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column
                        prop="authName"
                        label="权限名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="path"
                        label="路径"
                        width="180">
                </el-table-column>
                <el-table-column label="权限等级" width="180px">
                    <template slot-scope="slope">
                        <el-tag v-if="slope.row.level==='0'">标签二</el-tag>
                        <el-tag v-else-if="slope.row.level==='1'" type="success">标签二</el-tag>
                        <el-tag v-else type="warning">标签二</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'Rights',
    data () {
      return {
        rights: []
      }
    },
    created () {
      this.$http.get(`/api/rights/list`)
        .then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('查询权限列表失败')
          }
          this.rights = res.data.data
        })
    }
  }
</script>

<style scoped>

</style>
