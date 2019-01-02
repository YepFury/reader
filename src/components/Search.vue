<template>
    <div class="search">
        <mt-header title="搜索">
            <mt-button icon="back" @click="goBack" slot="left"></mt-button>
            <router-link to="/" slot="right">
                <mt-button>首页</mt-button>
            </router-link>
        </mt-header>
        <mt-search v-model="value">
            <mt-cell
                class="search-item"
                v-for="item in list" :key="item.id">
                <router-link :to="{path:'book',query:{bookId:item.id}}">
                    <h5>{{item.name}}</h5>
                    <p>{{item.author}}</p>
                </router-link>
            </mt-cell>
        </mt-search>
    </div>
</template>

<script>
    import {search} from "../fetch";

    export default {
        name: "Search",
        data() {
            return {
                value: '',
                list: []
            }
        },
        watch: {
            value(value) {
                search(value).then(res => {
                    console.log(res);
                    this.list = res;
                })
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style lang="less">
    .search {
        overflow: hidden;
        height: 100%;
        .mint-search-list {
            padding-top: 100px;
        }
        .search-item {
            border-bottom: 1px solid #d9d9d9;

            .mint-cell-wrapper {
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
                background: none;
            }

            .mint-cell-value {
                width: 100%;

                h5 {
                    line-height: 1.8;
                }

                p {
                    font-size: 14px;
                }
            }
        }


    }
</style>
