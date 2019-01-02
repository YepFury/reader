<template>
    <div class="list-container">
        <div class="sub-title">
            <h3>{{title}}</h3>
            <router-link to="/">MORE</router-link>
        </div>
        <ul class="vertical-list">
            <li v-for="item in list">
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
    export default {
        name: "VerticalList",
        props: ['title', 'list']
    }
</script>

<style lang="less">

</style>
