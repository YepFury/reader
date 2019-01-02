<template>
    <div class="register">
        <div class="logo"></div>
        <div class="register-form">
            <mt-field :class="{username, error: userState}" label="用户名" placeholder="请输入用户名" v-model="username"
                      blurs="用户名长度在8-16个字符"
                      @blur.native.capture="checkUser"></mt-field>
            <mt-field :class="{email, error: emailState}" label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"
                      @blur.native.capture="checkEmail"
                      blurs="邮箱格式不正确"></mt-field>
            <mt-field :class="{password, error: pwdState}" label="密码" placeholder="请输入密码" type="password"
                      blurs="密码长度在8-16个字符"
                      @blur.native.capture="checkPwd"
                      v-model="password"></mt-field>
            <mt-button type="primary" @click="registers">注册</mt-button>
        </div>
    </div>
</template>

<script>
    import {register} from "../fetch";
    import {Toast} from "mint-ui"
    import md5 from 'md5'

    export default {
        name: "Register",
        data() {
            return {
                username: '',
                email: '',
                password: '',
                userState: false,
                emailState: false,
                pwdState: false,
            }
        },
        methods: {
            checkUser() {
                if (this.username.length > 16 || this.username.length < 8) {
                    this.userState = true;
                } else {
                    this.userState = false;
                }
            },
            checkEmail() {
                let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                if (emailReg.test(this.email)) {
                    this.emailState = false;
                } else {
                    this.emailState = true;
                }
            },
            checkPwd() {
                if (this.password.length > 16 || this.password.length < 8) {
                    this.pwdState = true;
                } else {
                    this.pwdState = false;
                }
            },

            registers() {
                if (!this.userState && !this.emailState && !this.pwdState) {
                    register({
                        user: this.username,
                        pwd: md5(this.password),
                        email: this.email
                    }).then(res => {
                        if (res.insertStatus === 2) {
                            Toast({
                                message: '该账号已被注册，请重新填写'
                            })
                        } else if (res.insertStatus === 0) {
                            Toast({
                                message: '注册失败，请重新注册'
                            })
                        } else {
                            let instance = Toast('注册成功，正在登录');
                            this.$store.dispatch('getInfo', res.userInfo);
                            localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
                            setTimeout(() => {
                                instance.close();
                                this.$router.push('/')
                            }, 1500);
                        }
                    })
                } else {
                    Toast('请填写完整再注册');
                    return false;
                }
            }
        }
    }
</script>

<style lang="less">
    .register {
        padding-top: 30%;

        .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto 30px;
            background-image: url(../assets/logo.svg);
            background-repeat: no-repeat;
        }

        .register-form {
            width: 80%;
            margin: 0 auto;

            .mint-field {
                position: relative;
                margin-bottom: 20px;
                border-bottom: 1px solid #d9d9d9;

                &.error {
                    &::after {
                        display: block;
                    }
                }

                &::after {
                    content: attr(blurs);
                    font-size: 12px;
                    color: #f00;
                    position: absolute;
                    bottom: -4px;
                    left: 105px;
                    display: none;
                }
            }

            .mint-cell-wrapper {
                background: none;
                font-size: 14px;
            }

            .mint-button {
                width: 100%;
            }
        }
    }
</style>
