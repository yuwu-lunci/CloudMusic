<template>
    <div class="itemMusic">
        <ItemMusicTop :topData="state.detail"/>
        <ItemMusicList :songs="state.songs" :subscribedCount="state.detail.subscribedCount"/>
    </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted,reactive} from 'vue'
import {playList,musicList} from '@/request/api/item.js';
import ItemMusicTop from '../components/playListItem/ItemMusicTop.vue';
import ItemMusicList from '../components/playListItem/ItemMusicList.vue';
export default {
    name: "CloudMusicItemMusic",
    setup() {
        const state = reactive({
            detail: {},//歌单详情信息
            songs:{},//歌单歌曲列表
        });
        onMounted(async () => {
            let id = useRoute().query.id;
            //获取歌单信息
            let res = await playList(id);
            state.detail = res.data.playlist;
            // console.log(state.detail);

            //获取歌曲列表信息
            let songList=await musicList(id);
            state.songs=songList.data.songs;
            // console.log(state.songs);
            // 把state.detail存储到本地
            sessionStorage.setItem('itemDetail',JSON.stringify(state.detail))
        });
        return { state };
    },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {},
    components: { ItemMusicTop, ItemMusicList }
};
</script>

<style lang="less" scoped>
    // .itemMusic{
    //     // height: 1200px;
    // }
</style>