<template>
    <div class="itemMusicList">
        <!-- 顶部播放及收藏区域 -->
        <div class="musicListTop">
            <!-- //左边图标和播放全部 -->
            <div class="topLeft">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <span>播放全部<span>(共{{songs.length}}首)</span></span>
            </div>

            <div class="topRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao-copy"></use>
                </svg>
                <span>收藏({{subscribedCount}})</span>
            </div>
        </div>

        <!-- 歌曲列表 -->
        <div class="songList">
            <ul >
                <li v-for="(s,index) in songs" :key="index" >
                    <div class="songListLeft" @click="addPlayMusic(index)">
                        <div class="num">{{index+1}}</div>
                        <div class="song">
                            <p class="songName">{{s.name}}</p>
                            <span class="singer" v-for="(n,index) in s.ar" :key="index">{{n.name}}</span>
                        </div>
                    </div>
                    <!-- 右边图标 -->
                    <div class="songListRight">
                        <svg class="icon" aria-hidden="true" v-show="s.mv!=0">
                            <use xlink:href="#icon-shipin"></use>
                        </svg>
                        <svg class="icon" aria-hidden="true" >
                            <use xlink:href="#icon-liebiao-dian"></use>
                        </svg>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottomPage">
        <!-- 解决底部播放器挡住歌曲列表 -->
        </div>
    </div>
</template>

<script>

import {onMounted,reactive} from 'vue'
import { mapMutations } from 'vuex';
export default {
    name: 'CloudMusicItemMusicList',
    setup(props) {
        // console.log(props);
    },
    props:['songs',"subscribedCount"],

    mounted(){
         this.$store.commit('changeBottomNavShow',false);//进入歌单页面，让底部导航隐藏
    },
    methods: {
        addPlayMusic(index){
            this.addPlayList(this.songs);
            this.changePlayListIndex(index);
        },

        ...mapMutations(['addPlayList','changePlayListIndex'])
    },
};
</script>

<style lang="less" scoped>
    .itemMusicList{
        width: 100%;
        // height: 500px;
        background-color: white;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        .musicListTop{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .topLeft{
                width: 45%;
                display: flex;
                justify-content: space-around;
                .icon{
                    width: 25px;
                    height: 25px;
                }
                span{
                    font-weight: 800;
                    span{
                        font-weight: normal;
                        font-size: 14px;
                        color: #ccc;
                    }
                }
            }
            .topRight{
                padding: 10px;
                background-color: red;
                color: white;
                display: flex;
                // justify-content: space-around;
                border-radius: 18px;
                font-size: 14px;
                align-items: center;
                margin-right: 10px;
                .icon{
                    fill: white;
                    margin-right: 5px;
                    width: 15px;
                    height: 15px;
                }
            }
        }

        // 歌曲列表
        .songList{
            width: 100%;
            li{
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items:center;
            .songListLeft{
                width: 70%;
                height: 40px;
                display: flex;
                flex-flow: row;
                .num{
                    width: 40px;
                    text-align: center;
                    line-height: 40px;
                }
                .song{
                    // display: flex;
                    // justify-content: space-around;
                    // flex-flow: column;
                    //singer可能有多个，所以不能设置flex布局，把歌名换位p标签
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;//如果有多个歌手名可能会超出显示
                    .songName{
                        font-weight: 600;
                        width: 200px;
                        margin-bottom: 5px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-size: 13px;
                    }
                    .singer{
                        font-size: 12px;
                        color:gray;
                        
                    }
                    
                    // .singer:not(:first-child)::before{
                    //     content: '/';
                    // }
                    .singer~span::before{//在多个歌手之间加/
                        content: '/';
                    }
                }
            }
            .songListRight{
                // width: 20%;
                height: 50px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-right: 10px;
                .icon{
                    width: 25px;
                    height: 25px;
                    fill: #ccc;
                }
                //右边icon可能只有一个，
                .icon:last-child{
                    margin-left: 15px;
                }
            }
            }
            
        }
        //防固定定位遮挡主界面
        .bottomPage{
        width: 100%;
        height: 50px;
        }
    }
</style>