<template>
  <div class="home">
    <TopNav/>
    <SwiperTop/>
    <IconList/>
    <MusicList/>
  </div>
</template>

<script>
import TopNav from "@/components/home/TopNav.vue";
import SwiperTop from "../components/home/SwiperTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "../components/home/MusicList.vue";
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList
},
  mounted() {
     this.$store.commit('changeBottomNavShow',true)
  },
}
</script>

<style lang="less" scoped>
  .home{
    background-color: rgb(237, 237, 237);
  }
</style>