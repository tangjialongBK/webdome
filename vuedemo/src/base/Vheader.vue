<template>
    <div class="header">
        <slot></slot>
        <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
    </div>
</template>

<script>
    export default {
        name: "Vheader",
        props:{
          back:{
            type:Boolean,
            default:false
          }
        },
        methods:{
          goBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style scoped lang="less">
  .header{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 35px;
    line-height: 35px;
    color: darkblue;
    font-weight: bold;
    text-align: center;
    background: antiquewhite;
    i{
      position: fixed;
      top:0;
      left: 8px;
      line-height: 33px;
    }
  }
</style>
