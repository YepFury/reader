<template>
    <div class="fonts">
        <ul>
            <li>
                <label>字号</label>
                <div class="right">
                    <span @click="bigFonts">大</span>
                    <span @click="smallFonts">小</span>
                </div>
            </li>
            <li>
                <label>背景</label>
                <div class="right">
                    <i v-for="n in 5" @click="toggleStyle(n - 1)"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Fonts",
        methods: {
            bigFonts() {
                this.$store.dispatch('bigSize');
            },
            smallFonts() {
                this.$store.dispatch('smallSize');
            },
            toggleStyle(index) {
                this.$store.dispatch('currentStyle', index);
            }
        }
    }
</script>

<style lang="less">
    .fonts {
        position: fixed;
        bottom: -120px;
        height: 120px;
        background: none;
        width: 100%;
        color: #fff;
        font-size: 14px;
        z-index: 98;
        opacity: .8;
        background-color: #26a2ff;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

        &.show {
            bottom: 60px;
        }

        ul {
            li {
                line-height: 60px;
                display: flex;
                padding: 0 15px;

                label {
                    margin-right: 20px;
                }

                .right {
                    flex: 1;

                    span {
                        border: 1px #fff solid;
                        padding: 5px 30px;
                        color: #fff;
                        -webkit-border-radius: 15px;
                        -moz-border-radius: 15px;
                        border-radius: 15px;
                        margin-right: 15px;
                    }

                    i {
                        display: inline-block;
                        vertical-align: middle;
                        width: 30px;
                        height: 30px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        margin: 0 8px;
                        background-color: #777;
                        border: 1px solid #fff;
                        &:nth-child(1) {
                            background-color: #e9dfc7;
                        }
                        &:nth-child(2) {
                            background-color: #e7eee5;
                        }
                        &:nth-child(3) {
                            background-color: #a4a4a4;
                        }
                        &:nth-child(4) {
                            background-color: #cdefcd;
                        }
                        &:nth-child(5) {
                            background-color: #283548;
                        }
                    }
                }
            }
        }
    }
</style>
