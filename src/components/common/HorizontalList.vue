<template>
    <div class="list-container">
        <div class="sub-title">
            <h3>{{title}}</h3>
            <slot name="links"></slot>
        </div>
        <ul class="horizontal-list">
            <li v-for="item in list" :key="">
                <router-link :to="{path:'book', query:{bookId:item.id}}">
                    <img :src="item.images" :alt="item.name">
                    <h6>{{item.name}}</h6>
                    <p>{{item.author}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "HorizontalList",
        props: ['title', 'list']
    }
</script>

<style lang="less">

</style>
