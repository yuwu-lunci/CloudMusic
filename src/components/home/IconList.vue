<template>
    <div class="iconList">
        <van-swipe :loop="false" :width="65" :height="65" :show-indicators="false" class="mySwipe">
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tuijian"></use>
                    </svg>
                    <span class="word">每日推荐</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_luyinji"></use>
                    </svg>
                    <span class="word">私人FM</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gedan"></use>
                    </svg>
                    <span class="word">歌单</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-paihangbang"></use>
                    </svg>
                    <span class="word">排行榜</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zaixianzhibo"></use>
                    </svg>
                    <span class="word">直播</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhuanji"></use>
                    </svg>
                    <span class="word">数字专辑</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tushujieyue"></use>
                    </svg>
                    <span class="word">有书声</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-a-gerenyonghu"></use>
                    </svg>
                    <span class="word">关注新歌</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xingxing"></use>
                    </svg>
                    <span class="word">歌房</span>
                </van-swipe-item>
                <van-swipe-item  class="item">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youxi"></use>
                    </svg>
                    <span class="word">游戏专区</span>
                </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    name: 'CloudMusicIconList',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>
    .iconList{
        width: 100%;
        height: 1.9rem;
        background-color: #fff;
       .mySwipe{
            height: 2rem;
            margin-left: 0;
            display: flex;
            align-items: center;
            .item{
                // margin-left: 20px;
                display: flex;
                // width: 25%;
                justify-content: space-around;
                flex-flow: column;
                align-items: center;
                .icon{
                    width: 0.6rem;
                    height: 0.6rem;
                }
                .word{
                    font-size: 0.24rem;
                }
            }
        
       }
    }
</style>