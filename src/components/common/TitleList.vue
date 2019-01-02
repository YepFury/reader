<template>
    <div class="title-list" @click.stop="hideCover">
        <div class="content">
            <h5>章节目录</h5>
            <ul class="lists" @touchmove:prevent>
                <li v-for="(item, index) in lists" @click="changeCurrentCpt(index)">
                    <span>{{index+1}} {{item}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getTitleList} from "../../fetch";

    export default {
        name: "TitleList",
        props: ['bookId'],
        data() {
            return {
                lists: [],
            }
        },
        methods: {
            hideCover() {
                this.$store.state.cover = false;
            },
            changeCurrentCpt(index) {
                this.$store.dispatch('toggleCover')
                this.$store.dispatch('menus')
                this.$store.dispatch('currentCpt', index + 1)
            }
        },
        created() {
            getTitleList(this.bookId).then(res => {
                this.lists = res.titles.split('-')
            })
        }
    }
</script>

<style lang="less">
    .title-list {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, .5);
        padding-right: 50px;
        -webkit-transform: translateX(-100%);
        -moz-transform: translateX(-100%);
        -ms-transform: translateX(-100%);
        -o-transform: translateX(-100%);
        transform: translateX(-100%);
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;

        &.show {
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
        }

        .content {
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: #fff;
        }


        h5 {
            line-height: 50px;
            font-size: 18px;
            color: #26a2ff;
            text-align: center;
            border-bottom: 1px solid #26a2ff;
        }

        .lists {
            padding: 0 10px;

            li {
                line-height: 40px;
                border-bottom: 1px solid #d9d9d9;
                padding-left: 10px;
            }
        }
    }

    @keyframes toggleIn {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes toggleOut {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }

</style>
