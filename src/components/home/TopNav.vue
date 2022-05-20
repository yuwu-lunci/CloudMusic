<template>
    <div class="topNav">
        <div class="topList">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
        </svg>
        </div>

        <div class="topContent">
            <svg class="icon" aria-hidden="true" @click="searchPage()">
            <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>

        <div class="topSearch">
           <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-ziyuan"></use>
        </svg>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name: 'CloudMusicTopNav',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        searchPage(){
           this.$router.push('/Search');
            // this.changeBottomNavShow(false);//没必要在这加，在需要跳转的页面，挂载时调用即可
        },
    },
};
</script>

<style lang="less" scoped>
    .topNav{
        width: 100%;
        height: 1.2rem;
        padding: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
            width: 78%;
            height: 35px;
            background-color: #fff;
            border-radius: 20px;
            // align-items: center;
            .icon{
                margin-left: 15px;
                margin-top: 7.5px;
                fill: #ccc;
            }
        }
        .topList{
            .icon{
                width: 25px;
                height: 25px;
            }
        }
        .topSearch{
            .icon{
                width: 25px;
                height: 25px;
            }
        }
    }
</style>