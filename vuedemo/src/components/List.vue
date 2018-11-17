<template>
    <div>
      <Vheader :back="true">商品综合列表</Vheader>
        <div class="content" ref="offsetH" @scroll="scrollbar">
            <ul>
              <li v-for="(book,key) in bookList" :key="key">
                  <img :src="book.bookImg">
                  <div>
                      <p><span>书名：</span><router-link :to="{name:'mydetail',params:{a:book.bookName,b:book.bookId}}" tag="a">{{book.bookName}}</router-link></p>
                      <p><span>价格：</span><em>{{book.bookPrice|myFilter}}</em></p>
                      <p><span>出版：</span>{{book.bookOut}}</p>
                      <p><span>序号：</span><em>{{book.bookId}}</em></p>
                      <button @click="myDelete(book.bookId)">删除</button>
                  </div>
              </li>
            </ul>
          <div class="up" @click="getUp">加载更多...</div>
        </div>
    </div>
</template>

<script>
 import Vheader from '../base/Vheader.vue'
 import {getMore,bookDelete} from '../api/Index.js'
    export default {
        name: "List",
        created(){
          this.getB()
        },
        mounted(){
          let domMove = this.$refs.offsetH;
          let top = domMove.offsetTop;
          let distance = 0;
          domMove.addEventListener('touchstart',(e)=>{
            if(domMove.scrollTop !== 0 && domMove.offsetTop === top){return};
            let init = e.touches[0].pageY;
            let move = (e) =>{
              let current = e.touches[0].pageY;
                  distance = current - init;
              if(distance > 0){
                if(distance <= 50){
                  domMove.style.top = top+distance+'px';
                }else{
                  distance = 50;
                  domMove.style.top = top+distance+'px';
                }
              }else{
                domMove.removeEventListener('touchmove',move)
                domMove.removeEventListener('touchend',end)
              }
            };
            let end = ()=> {
              clearInterval(this.time1)
              this.time1=setInterval(()=>{
                if(distance<=50){
                  clearInterval(this.time1);
                  this.getB()
                }
                distance-=1;
                domMove.style.top = top+'px';
              },3)
            }
            domMove.addEventListener('touchmove',move)
            domMove.addEventListener('touchend',end)
          })
        },
        data(){
          return {
            bookList:[],offset:0,bookbool:true
          }
        },
        components:{
          Vheader
        },
        filters:{
          myFilter(target){
            return target+'元'
          }
        },
        methods:{
          async getB(){
            if(this.bookbool){
              let dat = await getMore(this.offset);
              let {hasMore,books} = dat.data;
              this.bookList = [...this.bookList,...books];
              this.bookbool=hasMore;
              this.offset=this.bookList.length
            }
          },
          scrollbar(){
            clearTimeout(this.time)
            this.time = setTimeout(()=>{
              let{scrollTop,clientHeight,scrollHeight} = this.$refs.offsetH;
              if(scrollTop+clientHeight+ 20 > scrollHeight){
                this.getB();
              }
            },13)
          },
          getUp(){
            this.getB()
          },
         async myDelete(id){
            await bookDelete(id)
            this.bookList = this.bookList.filter(item => item.bookId !== id)
          }
        }
    }
</script>

<style scoped lang="less">
  ul{
    display: flex;
    flex-wrap: wrap;
    padding-top:15px;
      li{
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          margin-bottom: 10px;
          border-bottom: 1px solid #eee;
          padding:10px 0 20px 0;
          img{
            width: 45%;
            height: 100%;
          }
          div{
            width: 55%;
            p{
              line-height: 25px;
              span{
                  color:#999;
              }
              a{
                 color:#000;
               }
              a:hover{
                color:red;
                text-decoration-line: underline;
              }
              em{
                color:red;
                font-style:normal;
              }
            }
            button{
              padding:0 20px;
              height: 30px;
              border-radius: 10px;
              background: orange;
              color:#fff;
              border: none;
              outline: none;
              letter-spacing: 5px;
            }
          }
      }
  }
  .up{
    width: 100%;
    margin-bottom:5px;
    line-height: 20px;
    text-align: center;
    color: crimson;
    background-color: aquamarine;
  }
</style>
