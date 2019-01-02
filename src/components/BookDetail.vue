<template>
    <div class="book-detail" v-if="book">
        <mt-header :title="book.name">
            <mt-button icon="back" @click="goBack" slot="left"></mt-button>
            <router-link to="/" slot="right">
                <mt-button>首页</mt-button>
            </router-link>
        </mt-header>
        <div class="book">
            <div class="image">
                <img :src="book.images" :alt="book.name">
            </div>
            <div class="base">
                <h4>{{book.name}}</h4>
                <p>作者：{{book.author}}</p>
                <p>分类：{{book.type}}</p>
                <p>{{book.wordcount}}万字</p>
                <rate :score="book.ratings"></rate>
            </div>
        </div>
        <div class="btns">
            <mt-button type="primary" @click="startRead">开始阅读</mt-button>
            <mt-button type="default" @click="insertShelf" :disabled="btnText !== '加入书架'">{{btnText}}</mt-button>
        </div>
        <div class="intro">{{book.intro}}</div>
        <div class="type">
            <h5>类别标签</h5>
            <span>{{book.type}}</span>
        </div>
        <div class="likes">
            <h5>相似推荐</h5>
            <ul class="horizontal-list">
                <li v-for="item in likes">
                    <similar :book-id="item"></similar>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getBook, postShelf, getLate, checkShelf} from "../fetch";
    import {mapState} from 'vuex'
    import {Toast, MessageBox} from "mint-ui"
    import Rate from "./rate/Rate"
    import Similar from "./common/Similar"
    import TitleList from './common/TitleList'


    export default {
        name: "BookDetail",
        components: {
            "rate": Rate,
            "similar": Similar,
            "title-list": TitleList
        },
        data() {
            return {
                book: null,
                likes: [],
                btnText: '加入书架',
                st: {}
            }
        },
        watch: {
            // 监听路由，点击底部喜欢的书籍路由会改变，重新获取数据
            $route(to, from) {
                this.getBook(to.query.bookId)
            }
        },
        computed: {
            ...mapState(['cover'])
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            getBook(id) {
                getBook(id).then(res => {
                    this.book = res;
                    this.likes = res.like.split('-');
                })
            },
            insertShelf() {
                if (localStorage.getItem('userInfo')) {
                    postShelf(JSON.parse(localStorage.getItem('userInfo')).id, this.book).then(res => {
                        console.log(res);
                        if (res) {
                            let instance = Toast('加入成功');
                            setTimeout(() => {
                                instance.close();
                                this.btnText = '已在书架'
                            }, 500);
                        } else {
                            let instance = Toast('加入失败');
                            setTimeout(() => {
                                instance.close();
                                this.btnText = '加入书架'
                            }, 500);
                        }
                    })
                } else {
                    MessageBox({
                        title: '提示',
                        message: '请先登录账户，是否登录?',
                        showCancelButton: true
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$router.push('/login');
                        } else {
                            return false
                        }
                    })
                }

            },
            startRead() {
                this.$router.push({
                    name: 'content',
                    params: {
                        bookId: this.$route.query.bookId
                    }
                })
            }
        },
        created() {
            this.getBook(this.$route.query.bookId);
            checkShelf(JSON.parse(localStorage.getItem('userInfo')).id, this.$route.query.bookId).then(res => {
                if (res) {
                    this.btnText = '已在书架'
                } else {
                    this.btnText = '加入书架'
                }
            })
            getLate(JSON.parse(localStorage.getItem('userInfo')).id, this.$route.query.bookId).then(res => {
                console.log(res);
                if (res) {
                    this.$store.dispatch('currentCpt', res.chapter);
                } else {
                    this.$store.dispatch('currentCpt', 1);
                }
            })
        }
    }
</script>

<style lang="less">
    .book-detail {
        .book {
            display: flex;
            padding: 15px;

            .image {
                width: 100px;
                margin-right: 15px;

                img {
                    width: 100%;
                }
            }

            .base {
                flex: 1;

                h4 {
                    font-size: 18px;
                    line-height: 1.8;
                }

                p {
                    line-height: 1.8;
                }
            }
        }

        .btns {
            display: flex;

            .mint-button {
                flex: 1;
                margin: 0 15px;
            }
        }

        .intro {
            text-indent: 2em;
            font-size: 16px;
            padding: 15px;
            line-height: 1.8;
            margin: 15px;
            border-top: 1px solid #d9d9d9;
            border-bottom: 1px solid #d9d9d9;
        }

        .type {
            margin: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #d9d9d9;

            h5 {
                font-size: 18px;
                margin-bottom: 15px;
            }

            span {
                display: inline-block;
                padding: 10px;
                border: 1px solid #d9d9d9;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
            }
        }

        .likes {
            padding: 0 15px;

            h5 {
                font-size: 18px;
                margin-bottom: 15px;
            }

            .horizontal-list {
                display: flex;
                padding-right: 10px;

                li {
                    flex: 1;
                }
            }
        }
    }
</style>
