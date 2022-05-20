<template>
    <div class="footerMusic">
        <div class="footerLeft" @click="showMusicDetail()">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="songDetail">
                <span class="songName">{{playList[playListIndex].name}}</span>
                    <svg class="icon" aria-hidden="true"  >
                        <use xlink:href="#icon-jian"></use>
                    </svg>
                <span class="singer">{{playList[playListIndex].ar[0].name}}</span>
                <!-- <span>横划可上下切换歌曲</span> -->
            </div>
        </div>
        <!-- 右边 -->
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="playMusic()" v-if="isBtnShow">
                <use xlink:href="#icon-65zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="playMusic()" v-if="!isBtnShow">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-24gf-playlist"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>

        <!-- 歌曲详情页 -->
        <van-popup  v-model:show="isMusicDetailShow" position="bottom" :style="{ height: '100%',width:'100%' }">
            <MusicDetail :musicDetail="playList[playListIndex]"  :getDuration="getDuration" :playMusic="playMusic"  :isBtnShow='isBtnShow' :id="playList[playListIndex].id"/>
        </van-popup>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import MusicDetail from './MusicDetail.vue'
export default {
    name: "CloudMusicFooterMusic",
    computed: {
        ...mapState(["playList", "playListIndex", "isBtnShow", "isMusicDetailShow","duration"]),
    },
    data() {
        return {
            clearInter:0,
        };
    },
    mounted() {
        console.log(this.$refs);
        this.$refs.audio.volume=0.3;
        this.getCurrentTime()//页面渲染时，调用定时器
         
    },
    updated() {
        // console.log(this.$refs.audio.duration);
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
        this.getDuration()
    },
    watch: {
        playListIndex: {
            // immediate:true,
            handler(newVal, oldVal) {
                // 当playListIndex发生改变后，让音乐自动播放
                this.$refs.audio.autoplay = true;
                if (this.$refs.audio.paused) {
                    this.changeBtnShow(false);
                }
                // console.log(newVal,oldVal);
            }
        },
        //由于存入playListIndex的是歌曲的索引，而 playListIndex初始值为0，因此点击第一首歌不会进行播放
        //所以可以监听playList是否变化
        playList: {
            // immediate:true,
            handler(newVal, oldVal) {
                if (this.isBtnShow) {
                    this.$refs.audio.autoplay = true;
                    this.changeBtnShow(false);
                }
            }
        }
    },
    methods: {
        playMusic() {
            // console.log(this.$refs.audio.duration);
            if (this.$refs.audio.paused) {
                //用过调用audio中的播放方法，实现音乐播放
                this.$refs.audio.play();
                this.changeBtnShow(false);
                this.getCurrentTime()//点击播放时，调用定时器
                //音乐播放后，把歌曲时常传入
            }
            else {
                this.$refs.audio.pause();
                this.changeBtnShow(true);
                clearInterval(this.clearInter)
            }
            // console.log(this.$refs.audio.paused);
        },
        showMusicDetail() {
            // this.changeBottomNavShow(false);
            this.changeMusicDetailShow(true);
        },
        getCurrentTime(){
           this.clearInter= setInterval(() => {
                this.changeCurrentTime(this.$refs.audio.currentTime);
            }, 1000);
        },
        getDuration(){
            this.getMusicTime(this.$refs.audio.duration);
        },
        ...mapMutations(["changeBtnShow", "changeMusicDetailShow","changeCurrentTime","getMusicTime","changeBottomNavShow"])
    },
    components: { MusicDetail }
};
</script>

<style lang="less" scoped>
    .footerMusic{
        width: 100%;
        height: 50px;
        background-color: #fff;
        // position: fixed;
        // bottom: 60px;
        border-top: 1px solid rgb(235, 234, 234);
        display: flex;
        justify-content: space-between;
        .footerLeft{
            width: 70%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 10px;
            img{
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin-right: 5px;
            }
           .songDetail{
               width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: flex;
                align-items: center;
                .songName{
                    font-size: 14px;
                }
                .icon{
                    fill: #666;
                    width: 12px;
                    height: 15px;
                    margin: 0 5px;
                }
                .singer{
                    color:#666;
                    font-size: 12px;
                }
           }
        }
        .footerRight{
            width: 20%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 10px;
            .icon{
                width: 30px;
                height: 30px;
            }
            .icon:last-child{
                width: 25px;
                height: 25px;
            }
        }
    }
</style>