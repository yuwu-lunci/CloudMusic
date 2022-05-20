<template>
    <div class="userInfo">
        <div class="userInfoTop">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-liebiao"></use>
            </svg>
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
        <!-- 用户信息层 -->
        <div class="userDetail">
            <img :src="userInfo.data.profile.avatarUrl" alt="">
            <div class="bottom">
                <p>{{userInfo.data.profile.nickname}}</p>
                <div>
                    <span>{{userInfo.data.profile.follows}} 关注</span>
                    <span>{{userInfo.data.profile.followeds}} 粉丝</span>
                    <span>Lv.{{userInfo.data.level}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'CloudMusicUserInfo',


    computed:{
         ...mapState(['user'])
    },
    data() {
        return {
           userInfo:this.user || JSON.parse(localStorage.getItem('userInfo'))
        };
    },

    mounted() {
        console.log(this.userInfo);
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>
    .userInfo{
        width: 100%;
        height: 650px;
        background-color: rgb(244, 244, 244);
        .userInfoTop{
            width: 95%;
            height: 60px;
            margin: 0 2.5%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .icon{
                width: 25px;
                height: 25px;
            }
        }
        .userDetail{
            width: 95%;
            height: 115px;
            margin: 0 2.5%;
            border-radius: 10px;
            background-color: #fff;
            margin-top: 50px;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            align-items: center;
            img{
                width: 80px;
                height: 80px;
                margin-top: -55px;
                border-radius: 50%;
            }
            .bottom{
                p{
                    font-size: 20px;
                    text-align: center;
                    font-weight: bolder;
                    margin-bottom: 10px;
                }
                div{
                    margin-bottom: 10px;
                    span{
                        margin-right: 20px;
                        color: #ccc;
                    }
                }
            }
        }
    }
</style>