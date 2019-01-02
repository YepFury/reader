<template>
    <div class="similar" v-if="book">
        <router-link :to="{path:'book', query:{bookId:book.id}}">
            <img :src="book.images" :alt="book.name">
            <h6>{{book.name}}</h6>
            <p>{{book.author}}</p>
        </router-link>
    </div>
</template>

<script>
    import {getBook} from "../../fetch";

    export default {
        name: "Similar",
        props: ['bookId'],
        data() {
            return {
                book: null
            }
        },
        watch: {
            bookId(value) {
                getBook(value).then(res => {
                    this.book = res;
                })
            }
        },
        created() {
            getBook(this.bookId).then(res => {
                this.book = res;
            })
        }
    }
</script>

<style scoped>

</style>
