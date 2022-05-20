<template>
  
  <div>
    <router-view/>
    <Bottom v-show="this.$store.state.isBottomShow"/>
  </div>
  
</template>

<script>
import Bottom from "./components/home/Bottom.vue";

export default{
    components: {  Bottom }
}

</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .icon{
    width: .4rem;
    height: .4rem;
  }
  a{
    color:black
  }
</style>
