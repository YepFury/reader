<template>
    <div class="rate">
        <span class="star" :class="item" v-for="(item,index) in classes"></span>{{score}}
    </div>
</template>

<script>
    export default {
        name: "Rate",
        props: ['score'],
        computed: {
            classes() {
                let result = []
                let score = Math.floor(this.score * 2) / 2
                let hasDecimal = score % 1 !== 0
                let integer = Math.floor(score)
                for (var i = 0; i < integer; i++) {
                    result.push('on')
                }
                if (hasDecimal) {
                    result.push('half')
                }
                while (result.length < 5) {
                    result.push('off')
                }
                return result
            }
        }
    }
</script>

<style lang="less">
    .rate {
        display: flex;
        align-items: center;

        .star {
            display: inline-block;
            width: 20px;
            height: 20px;
            background-size: 100% 100%;

            &.on {
                background: url("./star_on.png");
            }

            &.half {
                background: url("./star_half.png");
            }

            &.off {
                background: url("./star_off.png");
            }

            &:last-of-type {
                margin-right: 10px;
            }
        }
    }
</style>
