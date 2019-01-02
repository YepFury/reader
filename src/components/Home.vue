<template>
    <div class="container">
        <mt-header title="首页">
            <mt-button slot="right" @click="toPerson">MY</mt-button>
        </mt-header>
        <div class="swipe">
            <mt-swipe :auto="4000">
                <mt-swipe-item><img src="../../static/images/1.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../static/images/2.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../static/images/3.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../static/images/4.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../static/images/5.jpg" alt=""></mt-swipe-item>
            </mt-swipe>
        </div>
        <nav class="type-nav">
            <router-link class="nav-item" v-for="item in bookTypes"
                         :to="{path:'category',query: {type: item.type}}"
                         :key="item.type">
                <i class="icon icon-types"></i>
                <h5>{{item.title}}</h5>
            </router-link>
        </nav>
        <router-link class="searchs" to="/search">🔍搜索</router-link>
        <horizontal title="热门小说" :list="bookList | hot">
            <a slot="links" @click="getMore">换一换</a>
        </horizontal>
        <horizontal title="排行榜" :list="bookList | tops"></horizontal>
        <horizontal title="限时免费" :list="bookList | free"></horizontal>
        <vertical title="新书抢鲜" :list="bookList | fresh"></vertical>
        <vertical title="畅销完本" :list="bookList | finish"></vertical>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getBookList} from "../fetch";
    import Horizontal from '@/components/common/HorizontalList'
    import Vertical from '@/components/common/VerticalList'
    import {Toast} from 'mint-ui';

    export default {
        name: "Home",
        components: {
            'horizontal': Horizontal,
            'vertical': Vertical,
        },
        data() {
            return {
                bookList: [],
                bookTypes: []
            }
        },
        filters: {
            tops(value) {
                if (!value) return ''
                var arr = []
                value.forEach((item, index) => {
                    //简单更改下首页加载数据太多,可自行修改
                    if (index < 20) {
                        if (index % 3 == 1) {
                            arr.push(item)
                        }
                    }
                })
                return arr
            },
            hot(value) {
                if (!value) return ''
                var arr = []
                value.forEach((item, index) => {
                    //简单更改下首页加载数据太多,可自行修改
                    if (index < 20) {
                        if (index % 2 == 1) {
                            arr.push(item)
                        }
                    }
                })
                return arr
            },
            free(value) {
                if (!value) return ''
                var arr = []
                value.forEach((item, index) => {
                    //简单更改下首页加载数据太多,可自行修改
                    if (index < 20) {
                        if (index % 5 == 0) {
                            arr.push(item)
                        }
                    }
                })
                return arr
            },
            fresh(value) {
                if (!value) return ''
                let arr = []
                value.map((item) => {
                    if (parseFloat(item.wordcount) < 120) {
                        arr.push(item)
                    }
                })
                return arr.slice(0, 3);
            },
            finish(value) {
                if (!value) return ''
                return value.slice(0, 3);
            }
        },
        methods: {
            getMore() {
                Toast({
                    message: '操作成功',
                    iconClass: 'icon icon-success'
                });
            },
            toPerson(){
                if(localStorage.getItem('userInfo')) {
                    this.$router.push('/person');
                }
                else {
                    this.$router.push('/login');
                }
            }
        },
        created() {
            this.bookTypes = this.$store.state.types;
            getBookList().then(res => {
                console.log(res);
                this.bookList = res;
            })
        }
    }
</script>

<style lang="less">
    header {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
    }

    .swipe {
        height: 180px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .searchs {
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        width: 90%;
        margin: 15px auto;
        background-color: #efefef;
        font-size: 16px;
    }

    .type-nav {
        display: flex;
        background-color: #f8f8f8;
        padding: 10px 0;

        .nav-item {
            flex: 1;
            text-align: center;

            &:nth-of-type(1) {
                i {
                    background-position: -63px -28px;
                }
            }

            &:nth-of-type(2) {
                i {
                    background-position: 0 0;
                }
            }

            &:nth-of-type(3) {
                i {
                    background-position: 0 -30px;
                }
            }

            &:nth-of-type(4) {
                i {
                    background-position: 0 -60px;
                }
            }

            &:nth-of-type(5) {
                i {
                    background-position: -30px -30px;
                }
            }
        }
    }
</style>
