<template>
    <div>
      <Vheader :back="true">添加页</Vheader>
      <ul class="content">
        <li>
          <label for="Name" class="pinT">图片:</label>
          <input type="text" placeholder="输入网络图片地址" id="bookImg" v-model="book.bookImg">
        </li>
        <li>
          <label for="Name" class="pinT">名称:</label>
          <input type="text" placeholder="输入产品名称" id="bookName" v-model="book.bookName">
        </li>
        <li>
          <label for="Name" class="pinT">价格:</label>
          <input type="text" placeholder="售价多少" id="bookPrice" v-model.number="book.bookPrice">
        </li>
        <li class="set">
          <label for="Name" class="pinT">出产地:</label>
          <input type="text" placeholder="所出的地方或厂商" id="bookOut" v-model="book.bookOut">
        </li>
        <li class="center">
          <button @click="addBook">确定添加</button>
        </li>
      </ul>
    </div>
</template>

<script>
  import Vheader from '../base/Vheader.vue'
  import {getAdd} from '../api/Index.js'
    export default {
        name: "Add",
        components:{
          Vheader
        },
      data(){return{
         book:{}
      }},
      methods:{
          async addBook(){
            await getAdd(this.book)
            this.$router.push('/home')
          }
      }
    }
</script>

<style scoped lang="less">
  .contWrap {
    position: absolute;
    top: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  li{
    line-height: 25px;
    margin-top: 10px;
    width: 100%;
    text-align: justify;
  label{padding:0 10px;color:#000;font-weight: 600}
  input{border:1px solid #555;outline: none; padding: 3px 30px;margin-left:10px; background: aliceblue;}
  label.pinT{letter-spacing: 5px;}
  }
  li.center{
    text-align: center;
    button{
      outline: none;
      border:1px solid #888;
      padding:3px 20px;
      letter-spacing: 5px;
      background: aliceblue;
      border-radius: 5px;
    }
  }
  li.set{
    label{padding-right:0}
    input{margin-left:2px;}
  }
</style>
