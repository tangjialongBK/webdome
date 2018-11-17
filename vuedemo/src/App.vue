<template>
  <div id="app">
    <transition name="play">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="play">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue'
export default {
  name: 'App',
  components:{
    Tab
  }
}
</script>

<style>
    *{margin:0;padding:0;font-size: 14px;font-family: 微软雅黑;}
    ul,li{list-style: none;}
    a{text-decoration: none;color:#999}
    input,button{-webkit-appearance: none}
    .content{
      position: fixed;
      bottom:50px;
      top:35px;
      width: 100%;
      overflow: auto;
    }
  .play-enter{
    opacity: 0;
  }
  .play-enter-active{
    transition: all 1s linear;
  }
    .play-leave-ctive{
      transition: all 1s linear;
      opacity: 0;
    }
</style>
