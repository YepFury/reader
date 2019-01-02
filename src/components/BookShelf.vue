<template>
    <div class="book-shelf">
        <mt-header title="我的书架">
            <mt-button icon="back" slot="left" @click="goBack"></mt-button>
        </mt-header>
        <ul class=vertical-list>
            <li v-for="item in bookList">
                <router-link :to="{path:'book',query:{bookId:item.bookid}}">
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
    import {getShelf} from "../fetch";

    export default {
        name: "BookShelf",
        data(){
            return{
                bookList:[]
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        },
        created() {
            getShelf(JSON.parse(localStorage.getItem('userInfo')).id).then(res => {
                console.log(res);
                this.bookList = res;
            })
        }
    }
</script>

<style scoped>

</style>
