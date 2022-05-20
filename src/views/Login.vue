<template>
    <img src="@/assets/login1.jpeg" alt="">
    <div class="login">
        <div class="loginTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou-copy"></use>
            </svg>
        </div>
        <!-- 登录界面 -->
        <div class="loginMain">
            <span>Login</span>
            <input type="text" v-model="phone">
            <input type="password" name="" id="" v-model="password">
            <input type="submit" value="登录" class="sub" @click="login()">
        </div>
    </div>
</template>

<script>
import { getUserDetail } from "@/request/api/home";
export default {
    name: 'CloudMusicLogin',

    data() {
        return {
            phone:'',
            password:''
        };
    },

    mounted() {
        
    },

    methods: {
       async login(){
           let res=await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password});
           console.log(res);
            if (this.$store.state.loginCode===200) {
                this.$store.commit('updateisLogin');
                this.$store.commit('updateToken',res.data.token);
                let userInfo=await getUserDetail(res.data.account.id)
                console.log( userInfo);
                this.$store.commit('updateUserDetail',userInfo)
                this.$router.push('/userInfo')
            }else{
                alert('手机号或密码错误')
            }
        }
    },
};
</script>

<style lang="less" scoped>
    img{
        position: absolute;
        width: 100%;
        z-index: -99;
    }
    .login{
        width: 100%;
        height: 100%;
        .loginTop{
            width: 100%;
            height: 50px;
            // background-color: skyblue;
            display: flex;
            align-items: center;
            .icon{
                fill: white;
                margin-left: 10px;
                width: 25px;
                height: 25px;
            }
        }
        //登录主体页面
        .loginMain{
            width: 100%;
            height: 150px;
            // background-color: #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            margin: 150px 0;
            span{
                color: white;
                font-size: 18px;
            }
            input{
                width: 250px;
                height: 30px;
                opacity: 0.6;
                border: none;
            }
            .sub{
            //    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);;
            }
        }
    }
</style>