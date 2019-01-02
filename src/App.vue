<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="less">
    @import "assets/less/icons";
    @import "assets/less/common";
    #app {
        height: 100%;
        background-color: #fff;
    }
</style>
