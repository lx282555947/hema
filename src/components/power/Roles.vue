<template>
    <div>
        <h3>角色</h3>
    </div>
</template>

<script>
  export default {
    name: 'Roles',
    data(){
      return {
        roles:[]
      }
    },
    created () {
      this.getRoleList()
    },
    methods:{
      getRoleList(){
        this.$http.get('/api/roles')
          .then(res=>{
            if (res.data.meta.status !== 200) {
              return this.$message.error('查询角色列表失败')
            }
            this.roles = res.data.data
          })
      }
    }
  }
</script>

<style scoped>

</style>
