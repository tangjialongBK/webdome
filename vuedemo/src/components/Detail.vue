<template>
    <div class="wrapP">
      <Vheader :back="true">{{$route.params.a}}-----详情页</Vheader>
      <ul class="contWrap">
        <li class="imgLI">
          <img :src="books.bookImg" >
        </li>
        <li>
          <label for="Name" class="pinT">书名:</label>
          <input type="text" v-model="books.bookName">
        </li>
        <li>
          <label for="Name" class="pinT">价格:</label>
          <input type="text" v-model="books.bookPrice">
        </li>
        <li>
          <label for="Name">出版社:</label>
          <input type="text" v-model="books.bookOut" >
        </li>
        <li  class="imgLI">
          <button @click="getSend">确认修改</button>
        </li>
      </ul>
    </div>
</template>

<script>
  import Vheader from '../base/Vheader.vue'
  import {getData,getPut} from '../api/Index.js'
    export default {
        name: "Detail",
        data(){
          return {
            books:[]
          }
        },
        created(){
          this.getFind()
        },
        components:{
          Vheader
        },
        watch:{
          $route(){
            this.getFind()
          }
        },
        methods:{
          async getFind(){
            let book = await getData(this.$route.params.b);
            this.books = book.data;
            Object.keys(this.books).length > 0 ? void 0:this.$router.push('/list')
            /*方法二：console.log( JSON.stringify(book.data)=== '{}' )*/
          },
          async getSend(){
            await getPut(this.$route.params.b,this.books)
            this.$router.push('/home')
          }
        }
    }
</script>

<style scoped lang="less">
    .wrapP{
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom:0;
        z-index: 9999;
        background: #fff;
    }
  .contWrap{
    position: absolute;
    top:35px;
    bottom:0;
    left:0;
    right: 0;
    background: #fff;
    li.imgLI{
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
    li{
      line-height: 25px;
      margin-top: 10px;
      width: 100%;
      text-align: justify;
      label{padding:0 10px;color:#000;font-weight: 600}
      input{border:1px solid #555;outline: none; padding: 3px 30px;margin-left:10px; background: aliceblue;}
      label.pinT{letter-spacing: 5px;}
    }
  }
</style>
