<template>
    <div class="login">
        <div class="logo"></div>
        <div class="login-form">
            <div class="form-item">
                <i class="icon icon-user"></i>
                <mt-field placeholder="请输入邮箱/个性账号" v-model="username"></mt-field>
            </div>
            <div class="form-item">
                <i class="icon icon-lock"></i>
                <mt-field type="password" placeholder="请输入密码" v-model="password"></mt-field>
            </div>
            <div class="others">
                <router-link to="/register">注册账户</router-link>
                <span>忘记密码</span>
            </div>
            <mt-button type="primary" @click="logins">登录</mt-button>
        </div>

    </div>
</template>

<script>
    import {login} from "../fetch";
    import {Toast} from "mint-ui"
    import md5 from 'md5'

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            logins() {
                login(this.username, md5(this.password)).then(res => {
                    console.log(res);
                    if (res) {
                        this.$store.dispatch('getInfo', res);
                        localStorage.setItem('userInfo', JSON.stringify(res));
                        this.$router.push('/')
                    } else {
                        Toast({
                            message: '用户名或密码错误，请重新登录'
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .login {
        padding-top: 40%;

        .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto 30px;
            background-image: url(../assets/logo.svg);
            background-repeat: no-repeat;
        }

        .login-form {
            width: 80%;
            margin: 0 auto;

            .form-item {
                display: block;
                height: 48px;
                line-height: 48px;
                display: flex;
                margin-bottom: 15px;
                border-bottom: 1px solid #d9d9d9;

                .mint-cell-wrapper {
                    background: none;
                }

                i {
                    margin-top: 13px;
                }

                .mint-cell {
                    flex: 1;
                }


            }

            .others {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #26a2ff;
                padding: 20px 0;

                span {
                    flex: 1;
                    text-align: right;
                }

                a {
                    flex: 1;
                    color: #26a2ff;
                }
            }

            .mint-button {
                width: 100%;
            }
        }

    }
</style>
