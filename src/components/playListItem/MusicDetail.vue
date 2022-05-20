<template>
    <div class="musicDetail">
        <img :src="musicDetail.al.picUrl" alt="" class="bgImg">
        <div class="detailTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true"  @click="hiddenMusicDetail()">
                    <use xlink:href="#icon-xiangxiajiantou"></use>
                </svg>
                <div>
                    <Vue3Marquee>{{musicDetail.name}}</Vue3Marquee>
                <div>
                <span class="singerName" v-for="n in musicDetail.ar">{{n.name}}</span>
                <!-- <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg> -->
                </div>
                </div>
            </div>
            <div class="topRight">
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-fenxiang-copy"></use>
                </svg>
            </div>
        </div>

        <!-- 引入中间部分的图片 -->
        <div class="detailCenter" v-show="!isLyricShow" >
            <img src="@/assets/disc-plus.png" alt="" class="disc">
            <img src="@/assets/needle-plus.png" alt="" class="needle" :class="{needle_active:!isBtnShow}">
            <img :src="musicDetail.al.picUrl" alt="" class="creatorImg"  @click="isLyricShow=true" :class="{creatorImg_start:!isBtnShow,creatorImg_pause:isBtnShow}">
        </div>
        <!-- 歌词 -->
        <div class="lyric" v-show="isLyricShow" ref="lyr" @click="isLyricShow=false">
            <p v-for="l in lyrics1" :key="l" :class="{p_active:(currentTime*1000 <=l.pre && currentTime*1000>=l.time)}">{{l.lyr}}</p>
        </div>
        <!-- 底部 -->
        <div class="detailFooter">
            <div class="footerTop">
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-changge-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-icon_pinglun-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-liebiao-dian"></use>
                </svg>
            </div>
            <div class="footerCenter">
                <input type="range" name="" id="" min="0" :max="duration" step="0.1" v-model="currentTime">
            </div>
            <div class="footerBottom">
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                 <svg class="icon" aria-hidden="true" @click="lastSong()">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="playMusic()" v-if="isBtnShow">
                    <use xlink:href="#icon-65zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="playMusic()" v-if="!isBtnShow">
                    <use xlink:href="#icon-zanting-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true"  @click="nextSong()">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-liebiao2-copy"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
//引入跑马灯效果
import { lyric } from '@/request/api/item';
import {Vue3Marquee} from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';
import { onMounted,updated} from '@vue/runtime-core';

export default {
    name: 'CloudMusicMusicDetail',

    props:['musicDetail','playMusic','isBtnShow','id','getDuration'],
    components: {
        Vue3Marquee,
    },
    data() {
        return {
            isLyricShow:false,
            // lyrics:'',
        }
    },
   
   computed:{
       ...mapState(['currentTime','lyrics','duration','playListIndex','playList']),
      lyrics1:function( ){
          if (this.lyrics) {
              let arr;
             arr= this.lyrics.split(/[(\r\n)\r\n]+/).map((item,index)=>{
                 let min=item.slice(1,3)
                 let sec=item.slice(4,6)
                 let mil=item.slice(7,10)
                 let lyr=item.slice(11,item.length)
                 let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mil)
                 if (isNaN(Number(mil))) {
                     mil=item.slice(7,9);
                     lyr=item.slice(10,item.length)
                     time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mil)
                 }
                // console.log(min,sec,mil,lyr);
                // console.log(time);
                return {min,sec,mil,lyr,time}
             });
             if (arr[0].time!==0) {//有的歌曲不是从0开始计时的，
                 arr.unshift({
                     mil: "000",min: "00",sec: "00",time: 0
                 })
                //  console.log(arr[0].time);
             }
             arr.forEach((item,index) => {
                 if (index===arr.length-1) {
                     item.pre=0
                 }else{
                     item.pre=arr[index+1].time
                 }
             });
            // console.log(arr);
             return arr;
          }
       },
   },
   mounted() {
    //    console.log(this.playList);
        // console.log(this.duration);
       this.getDuration();
       
   },
    updated(){
        //歌曲自动播放下一首，或者点击下一首，需要重新获取歌曲总时长
        this.getDuration()
    },
    methods: {
        lastSong(){//上一首歌
            if (this.playListIndex-1<0) {
                this.changePlayListIndex(this.playList.length-1)
            }else{
                this.changePlayListIndex(this.playListIndex-1)
            }
        },
        nextSong(){//下一首歌
            if (this.playListIndex+1===this.playList.length) {
                this.changePlayListIndex(0)
            }else{
                this.changePlayListIndex(this.playListIndex+1)
            }
        },

        hiddenMusicDetail(){
            this.changeMusicDetailShow();//退出要让歌词页面隐藏，显示磁盘
            this.isLyricShow=false;
            // this.changeBottomNavShow(true);
        },
        ...mapMutations(['changeMusicDetailShow','getMusicTime','changePlayListIndex'])
    },
    watch:{
        currentTime:function(newValue){
                let p=document.querySelector('p.p_active')
                // console.log(p);
                if (p) {//arr中最后一个值中time为NaN
                    if (p.offsetTop>300) {
                    this.$refs.lyr.scrollTop=p.offsetTop-300;
                }
                }
                //判断歌曲是否播放完,结束则播放下一首
                // console.log(newValue,this.duration);
                if (newValue===this.duration) {
                    this.nextSong()
                }
        }
    }
};
</script>

<style lang="less" scoped>
    .musicDetail{
        // background-color: #ccc;
        width: 100%;
        height: 100%;
        .bgImg{
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -999;
            filter: blur(.8rem);
        }
        .detailTop{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .topLeft{//左边
                display: flex;
                justify-content: space-around;
                align-items: center;
                .icon{
                    width: 25px;
                    height: 25px;
                    margin: 0 10px;
                    fill:white

                }
                div{
                    width: 100px;
                    height: 100%;
                    div{
                        width: 100px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;//如果有多个歌手名可能会超出显示
                        font-size: 12px;
                        color:#999;
                        display: flex;
                        align-items: center;
                        .singerName~span::before{
                            content: '/';
                        }
                        .icon{
                            fill: #999;
                            width: 12px;
                            height: 12px;
                        }
                    }
                }
            }
            .topRight{//右边分享图标
                padding-right: 10px;
                .icon{
                    width: 30px;
                    height: 30px;
                    fill:white
                }
            }
        }
        //歌词
        .lyric{
            width: 100%;
            height: 430px;
            overflow: scroll;
            padding-top: 20px;
            text-align: center;
            font-size: 16px;
            color:#ccc;
            p{
                margin-bottom: 20px;
            }
            .p_active{//歌词变换颜色以及放大
                font-size: 20px;
                color:white;
            }
        }
        .detailCenter{
            position: relative;
            width: 100%;
            height: 430px;
            display: flex;
            align-items: center;
            flex-direction: column;
            .needle{
                width: 2.4rem;
                height: 3rem;
                position: absolute;
                left: 46%;
                //设置原点
                transform-origin: 0 0;
                transform: rotate(-10deg);
                transition: all 2s;
            }
            .needle_active{//点击播放时，改变磁针的样式
                width: 2.4rem;
                height: 3rem;
                position: absolute;
                left: 46%;
                //设置原点
                transform-origin: 0 0;
                transform: rotate(10deg);
                transition: all 2s;
            }
            .disc{
                width: 250px;
                height: 250px;
                position: absolute;
                bottom: 90px;
                z-index: -1;
            }
            .creatorImg{
                width: 160px;
                height: 160px;
                position: absolute;
                bottom: 132px;
                border-radius: 50%;
                // z-index: -10;
                animation: rotateImg 10s linear infinite;
            }
            .creatorImg_start{//animation--play-state属性指定动画是否正在运行或已暂停。
                animation-play-state: running;//运行动画
            }
            .creatorImg_pause{
                animation-play-state: paused;//暂停动画
            }
             @keyframes rotateImg{
                0%{transform: rotateZ(0deg);}
                100%{transform: rotateZ(360deg);}
            }
        }
        //底部区域
        .detailFooter{
            width: 100%;
            .footerTop{
                height: 80px;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .icon{
                    fill:white;
                    width: 30px;
                    height: 30px;
                }
            }


            //中间部分
            //歌曲进度条
            .footerCenter{
                width: 100%;
                input{
                    width: 90%;
                    margin-left: 5%;
                    height: 5px;
                }
            }
            //底部
            .footerBottom{
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .icon{
                    fill:white;
                    width: 30px;
                    height: 30px;
                }
                .icon:nth-child(3){
                    width: 60px;
                    height: 60px;
                }
            }
        }
    }
   
</style>