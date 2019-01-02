<template>
    <div class="cate">
        <mt-header :title="title">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <ul class=vertical-list>
            <li v-for="item in bookList">
                <router-link :to="{path:'book',query:{bookId:item.id}}">
                    <div class="image">
                        <img :src="item.images" :alt="item.name">
                    </div>
                    <div class="base">
                        <h4>{{item.name}}</h4>
                        <p>{{item.intro}}</p>
                        <div class="author">
                            <i class="icon icon-author"></i>
                            <span>{{item.author}}</span>
                        </div>
                        <div class="category">
                            <span>{{item.type}}</span>
                            <span>{{item.serialize}}</span>
                            <span>{{item.wordcount}}万字</span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getBookType} from "../fetch";

    export default {
        name: "Category",
        data() {
            return {
                title: '',
                bookList: []
            }
        },
        methods: {},
        created() {
            this.$store.dispatch('getType', this.$route.query.type).then(res => {
                console.log(res);
                this.title = res;
                getBookType(res).then(response => {
                    console.log(response);
                    this.bookList = response;
                })
            });
        }
    }
</script>

<style lang="less">
    .cate {

    }

</style>
