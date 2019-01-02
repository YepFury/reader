<template>
    <div class="bottom-menu">
        <ul>
            <li @click="switchLists">
                <i class="icon icon-menu"></i>
                <span>目录</span>
            </li>
            <li @click="switchFonts">
                <i class="icon icon-ft"></i>
                <span>字体</span>
            </li>
            <li @click="switchNights">
                <i class="icon" :class="night?'icon-day':'icon-night'"></i>
                <span>{{nightText}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "BottomMenu",
        data() {
            return {}
        },
        computed: {
            ...mapState(['nightText', 'night'])
        },
        methods: {
            switchLists() {
                this.$store.dispatch('toggleCover')
            },
            switchFonts() {
                if (this.$store.state.font) {
                    this.$store.dispatch('font', false)
                } else {
                    this.$store.dispatch('font', true)
                }
            },
            switchNights() {
                this.$store.dispatch('switchNight');
            }
        }
    }
</script>

<style lang="less">
    .bottom-menu {
        height: 60px;
        background-color: #26a2ff;

        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 99;
        -webkit-transform: translateY(60px);
        -moz-transform: translateY(60px);
        -ms-transform: translateY(60px);
        -o-transform: translateY(60px);
        transform: translateY(60px);
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

        &.show {
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -o-transform: translateY(0);
            transform: translateY(0);
        }

        ul {
            display: flex;

            li {
                flex: 1;
                text-align: center;
                padding-top: 10px;

                span {
                    display: block;
                    color: #fff;
                }
            }
        }
    }
</style>
