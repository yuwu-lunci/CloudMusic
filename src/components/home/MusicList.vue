<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">推荐歌单</div>
            <div class="more">更多
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou1"></use>
                    </svg>
            </div>
        </div>

        <div class="playList">
            <van-swipe :loop="false" :width="125" :height="120" :show-indicators="false" class="mySwipe">
                <van-swipe-item v-for="music in musicList" :key="music.id" class="item">
                   <router-link :to="{path:'/itemMusic',query:{id:music.id}}" @click="hiddenBottom()">
                        <img :src="music.picUrl" alt="">
                    <span class="rightTop">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zanting_"></use>
                        </svg>
                        {{changeCount(music.playCount)}}
                    </span>
                    <span class="name">{{music.name}}</span>
                   </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>

    </div>
</template>

<script>
import {getMusicList}  from "@/request/api/home.js";
import { mapMutations } from 'vuex';
export default {
    name: 'CloudMusicMusicList',

    data() {
        return {
            musicList:[]
        };
    },

    mounted() {
       this.playList()
    },

    methods: {
       async playList(){
            let res=await getMusicList();
            console.log(res);
            this.musicList=res.data.result;
            // console.log(this.musicList[0]);
        },
        changeCount(num){
            if (num>10000000) {
                return (num/10000000).toFixed(1)+"亿"
            }else if (num>10000) {
                return (num/10000).toFixed(1)+"万"
            }
        },
        hiddenBottom(){
            this.changeBottomNavShow(false);
        },

        ...mapMutations(["changeBottomNavShow"])
    },
};
</script>

<style lang="less" scoped>
    .musicList{
        width: 100%;
        height: 4.4rem;
        padding: 0.1rem .2rem;
        background-color: #fff;
        margin-top: 1px;
        .musicTop{
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                font-size: 0.4rem;
                font-weight: 900;
            }
            .more{
                // width: 75px;
                text-align: center;
                border: 0.02rem solid #ccc;
                padding: .04rem 0.1rem .04rem .2rem;
                border-radius: 0.4rem;
                display: flex;
                align-items: center;
                font-size: 14px;
                .icon{
                    width: 12px;
                    height: 12px;
                }
            }
        }
        .playList{
            width: 100%;
            height: 3.5rem;
            .mySwipe{
                height: 100%;
                width: 100%;
                margin-left: 0px;
                margin-top: 10px;
                .item{
                    position: relative;
                    // 由于每个item宽高固定，设置margin会让item超出父盒子的长度
                    // margin-right: 5px;
                    // margin-top: 0.2rem;
                    img{
                        border-radius: 0.16rem;
                        // 每个item设置为125px，图片为125，这样每个item之间就有5px间隔
                        width: 120px;
                    }
                    .rightTop{
                    position: absolute;
                    right: 8px;
                    top: .1rem;
                    font-size: 0.28rem;
                    color: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .icon{
                        width: 0.32rem;
                        height: .32rem;
                        margin-right: 0.04rem;
                    }
                }
                .name{
                    font-size: 13px;
                    //文字超出隐藏
                    display: -webkit-box;//伸缩盒显示
                    -webkit-line-clamp: 2;//限制文字显示行数
                    -webkit-box-orient: vertical;//盒子内子对象排列
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                }
            }
        }
    }
</style>