<template>
    <div>
      <Vheader>实战项目</Vheader>
      <div class="content">
          <Loading v-if="isFome"></Loading>
          <template v-else>
            <Swiper :swiperSlides="imgArr"></Swiper>
            <h3>书刊专栏</h3>
            <ul class="bookWrap">
              <li v-for="(hot,index) in commodity" :key="index">
                  <img :src="hot.bookImg">
                  <p><span class="bookInfo">书名：</span><span class="underline">{{hot.bookName}}</span></p>
                  <p><span class="bookInfo">价格：</span><em>{{hot.bookPrice|toFixed}}</em></p>
                  <p><span class="bookInfo">出版社：</span><span class="underline">{{hot.bookOut}}</span></p>
                  <a class="imgA" href=""></a>
              </li>
            </ul>   <!--书刊专栏-->
          </template>
      </div>
    </div>
</template>

<script>
  import Vheader from '../base/Vheader.vue'
  import Swiper from  '../base/Swiper.vue'
  import {getAll} from '../api/Index.js'
  import Loading from '../base/Loading.vue'
    export default {
        name: "Home",
        created(){
          this.getSlider()  /*获取轮播图片*获取商品图片*/
        },
        data (){
          return {
              imgArr:[],
              commodity:[],
              isFome:true
          }
        },
        filters:{
          toFixed(target){
            return target + '元'
          }
        },
        methods:{
          async getSlider(){
            let [img,bImg] = await getAll();
            this.imgArr= img.data;
            this.commodity= bImg.data;
            this.isFome=false
          }
        },
        components:{
          Vheader,Swiper,Loading
        }
    }
</script>

<style scoped lang="less">
    h3{
      width: 80%;
      padding: 5px 0 15px 10px;
      color:darkred;
      line-height: 18px;
    }
  ul.bookWrap{
      display: flex;
      flex-wrap: wrap;
      li{
        position:relative;
        width: 49.4%;
        text-align: center;
        padding:5px 0 15px 0;
        border:1px solid #eee;
        p{
          padding:3px 0 3px 8px;
          text-align: justify;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #888;
          em{
            color:red;
            font-style: normal;
          }
          span.bookInfo{
            color:darkred;
            font-weight: bold;
          }
        }
        img{
          width:100%;
          height: 70%;
        }
        a.imgA{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 70%;
        }
      }
  }
 ul.bookWrap{
   li:hover{border-color: deeppink;
     p{
       span.underline:hover{text-decoration-line: underline;color: red;}
     }
   }
 }
</style>
