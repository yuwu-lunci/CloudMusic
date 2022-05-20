<template>
    <div class="bottomList">
        <div class="list">
            <svg class="icon" aria-hidden="true" @click="$router.push('/')">
                <use xlink:href="#icon-yinle-03"></use>
            </svg>
            <span>发现</span>
        </div>
        <div class="list">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shengbo-copy666"></use>
            </svg>
            <span>播客</span>
        </div>
        <div class="list" @click="$router.push('/userInfo')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle"></use>
            </svg>
            <span>我的</span>
        </div>
        <div class="list">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yonghubangding-copy"></use>
            </svg>
            <span>关注</span>
        </div>
        <div class="list">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-cloud"></use>
            </svg>
            <span>云村</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CloudMusicBottomList',

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
    .bottomList{
        width: 100%;
        height: 60px;
        background-color: #fff;
        // position: fixed;
        // bottom: 0;
         display: flex;
        justify-content: space-around;
        align-items: center;
        .list{
           display: flex;
           flex-flow: column;
           align-items: center;
           .icon{
               fill: #666;
               width: 30px;
               height: 30px;
           }
           span{
               font-size: 5px;
               color: #666;
           }
        }
    }
</style>