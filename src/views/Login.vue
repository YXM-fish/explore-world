<template>
    <div class="page">
        <section class="login">
            <el-form class="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="用户名：" prop="username">
                    <el-input type="text" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登 录</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: ['change', 'blur'] }],
                password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }]
            }
        }
    },
    methods: {
        login() {
            this.$refs.form.validate(valid => {

            })
        }
    }
}
</script>

<style lang="scss" scoped>
.page{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.login{
    border: 1px solid rgb(216, 216, 216);
    border-radius: 5px;
    padding: 20px 30px;
    margin-right: 20%;
}
</style>
