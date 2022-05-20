<template>
    <div class="search">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="cancelHome()">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <input type="text" placeholder="周杰伦" v-model="searchValue" @keydown.enter="search()">
    </div>

    <div class="searchHistory">
        <span class="word">历史</span> <span class="history" v-for="s in searchList" :key="s" @click="clickHistory(s)">
            {{s}}
        </span>
        <svg class="icon" aria-hidden="true" @click="deleteHistory()">
            <use xlink:href="#icon-lajitong"></use>
        </svg>
    </div>
    
    <!-- 搜索结果展示 -->
    <div class="searchRes" v-show="showRes">
        <div class="searchSinger">
            <img :src="singer.cover" alt="">
            <p>歌手：{{singer.name}}</p>
        </div>
        <div class="searchSongs">
            <div class="top">
                <span class="topLeft">单曲</span>
                <span class="topRight">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-playCircle"></use>
                    </svg>
                </span>
            </div>
            <!-- 歌曲列表 -->
            <div class="songList" @click="updatedIndex(song)" v-for="song in searchSongList" :key="song" >
                <div class="songDetail">
                    <p class="songName">{{song.name}}</p>
                    <div class="bottom">{{song.artists[0].name}}--{{song.album.name}}</div>
                    <!-- <span class="songName">{{song.name}}</span>
                    <span class="artist">{{song.artists[0].name}}</span>--
                    <span class="album">{{song.album.name}}</span> -->
                </div>
                <div class="right">
                     <svg class="icon" aria-hidden="true" v-show="song.mvid">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" >
                        <use xlink:href="#icon-liebiao-dian"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="bottomPage">
        <!-- 解决底部播放器挡住歌曲列表 -->
    </div>
    </div>
</template>

<script>
import {searchMusic,getSinger} from '@/request/api/home'
export default {
    name: 'CloudMusicSearch',

    data() {
        return {
            searchList:[],//把搜索历史保存在数组中
            searchValue:'',
            searchSongList:[],
            searchSinger:'',
            singer:{},
            singerCover:'',
            showRes:false,
        };
    },

    mounted() {
        //删除再，刷新后，本地'searchList'的值为空，而转成的json不为[],
       this.searchList= JSON.parse(localStorage.getItem('searchList'))||[]
        this.$store.commit('changeBottomNavShow', false);//隐藏底部导航
    }, 

    updated() {
    },
    methods: {
       async search(){
            if (this.searchValue) {
                this.searchList.unshift(this.searchValue)
            }
            //去重
            this.searchList=[...new Set(this.searchList)]
            //限制搜索历史长度
            if (this.searchList.length>5) {
                this.searchList.splice(this.searchList.length-1,1)//splice会改变原数组
            }
            //输入后，把searchList存入本地
            localStorage.setItem('searchList',JSON.stringify(this.searchList))

            //获取搜索的歌曲
            let res=await searchMusic(this.searchValue)
            this.searchSongList=res.data.result.songs;
            //获取歌手id
            let singerId=res.data.result.songs[0].artists[0].id;
            let singerDetail=await getSinger(singerId);
            // console.log(singerDetail);
            this.singer=singerDetail.data.data.artist
            console.log(this.searchSongList);
            //点击之后让showRes为true
            this.showRes=true;
        },
        deleteHistory(){
            localStorage.removeItem('searchList');
            this.searchList=[]
        },
       async clickHistory(s){
            let res=await searchMusic(s)
            this.searchSongList=res.data.result.songs;
            console.log(this.searchSongList);
            let singerId=res.data.result.songs[0].artists[0].id;
            let singerDetail=await getSinger(singerId);
            this.singer=singerDetail.data.data.artist
            this.showRes=true;
            // this.searchSinger=res.data.result.songs[0].artists[0].name;
            // console.log(this.searchSinger);
        },
        updatedIndex(song){
            song.al=song.album;
            song.al.picUrl = song.album.artist.img1v1Url;
            song.ar=song.artists;
            song.ar.name=song.artists[0].name;
            this.$store.commit('updatePlayList', song);
            this.$store.commit('changePlayListIndex',this.$store.state.playList.length-1);
        },
        cancelHome(){
            this.$router.go(-1);
            // this.$store.commit('changeBottomNavShow',true)可以在home页面挂载时调用
        }
    },
};
</script>

<style lang="less" scoped>
    .search{
        width: 100%;
        background-color: rgb(242, 242, 242);
        .searchTop{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        // background-color: skyblue;
            .icon{
                width: 25px;
                height: 25px;
                margin: 0 10px;
        }
            input{
                font-size: 16px;
                width: 85%;
                height: 30px;
                border: none;
                border-bottom: 1px solid black;  
                background-color: rgb(242, 242, 242); 
            }
    }
    .searchHistory{
        position: relative;
        width: 90%;
        margin-top: 10px;
        .word{
            display: inline-block;
            height: 30px;
            line-height: 32px;
            margin-left: 10px;
            font-weight: bolder;
        }
        .history{
            display: inline-block;
            font-size: 14px;
            padding: 4px 10px;
            background-color: rgb(230, 230, 230);
            border-radius: 20px;
            margin-left: 10px;
            margin-bottom: 10px;
        }
        .icon{
            position: absolute;
            width: 25px;
            height: 25px;
            top: 2px;
            right: -25px;
        }
    }

    //搜索结果
    .searchRes{
        width: 100%;
        .searchSinger{
            width: 95%;
            height: 70px;
            border-radius: 10px;
            margin-left: 2.5%;
            background-color: #fff;
            display: flex;
            align-items: center;
            img{
                margin-left: 15px;
                margin-right: 10px;
                width: 40px;
                height: 40px;
                border-radius: 20px;
            }
        }
        .searchSongs{//歌曲列表
            width: 95%;
            margin-top: 10px;
            margin-left: 2.5%;
            border-radius: 10px;
            background-color: #fff;
            .top{
                margin-left: 15px;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .topLeft{
                    font-size: 20px;
                    font-weight: bolder;
                }
                .topRight{
                    margin-right: 15px;
                   .icon{
                        width: 25px;
                    height: 25px;
                   }
                }
            }
            .songList{//
                width: 91%;
                height: 70px;
                margin-left: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #ccc;
                .songDetail{
                    width: 80%;
                    // display: flex;
                    // align-items: center;
                    .songName{
                        font-size: 18px;
                    }
                    div{
                        margin-top:5px ;
                        width: 200px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 12px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .right{
                    .icon:last-child{
                        margin-left: 10px;
                    }
                }
            }
        }
        
    }
    .bottomPage{
        width: 100%;
        height: 50px;
        background-color: #fff;
    }
    }
</style>