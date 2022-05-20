<template>
    <div id="swipe-top">
       <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
            <img :src="image.pic" />
        </van-swipe-item>
</van-swipe>
    </div>
</template>

<script>
import {getBanner} from '@/request/api/home.js';
import axios from 'axios'
import {reactive,onMounted } from 'vue';

export default {
    name: 'CloudMusicSwiperTop',

    //vue3用法
    // setup() {
    // const state = reactive(
    //     {
    //         images : []
    //     }
    // ) ;
    // onMounted(async()=>{
    //     let res= await getBanner();
    //       state.images=res.data.banners;
    // }) 
    // //v-for="image in state.images,使用这种方法记得在images前加state
    // return { state };
    // },

    data() {
        return {
            images:[]
        };
    },

    mounted() {
        //调用获取轮播图的方法
       this.banner()
    },

    methods: {
        //下次获取能不能先把接口打开？
        async banner(){
          let res= await getBanner();
          this.images=res.data.banners;
        //    console.log(res);
        }
    },
};
</script>

<style lang="less" >
    .van-swipe{
        width: 95%;
        height: 3rem;
        // padding: 0 0.2rem;
        margin-left: 2.5%;
        border-radius: 5px;
        .van-swipe__track{
            .van-swipe-item{
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        //下面内容，在scoped下，不能显示
        // .van-swipe__indicator--active{
        //     background-color:#000;
        // }
    }
</style>