<template>
    <div class="bottom">
        <FooterMusic/>
        <BottomList v-show="$store.state.isBottomNavShow"/>
    </div>
</template>

<script>
import FooterMusic from "@/components/playListItem/FooterMusic.vue";
import BottomList from "@/components/home/BottomList.vue";
export default {
    name: 'CloudMusicBottom',

    components: { FooterMusic, BottomList},
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
    .bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
    }
</style>