<template>
    <div class="login-container">
        <div class="login-box">

        </div>
<!--        <el-form ref="form" :model="form" label-width="80px">-->
<!--            <el-form-item label="活动名称">-->
<!--                <el-input v-model="form.name"></el-input>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                form:{
                    name:""
                }
            }
        }
    }
</script>

<style scoped>
    .login-container {
        background-color: pink;
        height: 100%;
    }
    .login-box {
        width: 450px;
        height: 300px;
        background-color: yellow;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
