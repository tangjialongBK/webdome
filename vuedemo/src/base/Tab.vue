<template>
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-shouye-1"></i>
        <span>首页</span>
      </router-link>
      <router-link to="list">
        <i class="iconfont icon-liebiao"></i>
        <span>列表</span>
      </router-link>
      <router-link to="add">
        <i class="iconfont icon-tianjia"></i>
        <span>添加</span>
      </router-link>
      <router-link to="collect">
        <i class="iconfont icon-shoucang"></i>
        <span>收藏</span>
      </router-link>
    </div>
</template>
<style scoped lang="less">
  .footer{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    height: 50px;
    display: flex;
    background: antiquewhite;
    a{
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color:deeppink;
    }
    a.router-link-active{
      color: black;
    }
  }
</style>
