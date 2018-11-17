import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'; //  默认接口地址

//  获取轮播图
export let getSliders = () => {
    return axios.get('/sliders')
}

//  获取商品图
export  let getHot = () => {
   return axios.get('/hot')
}

//  增删改查
export  let getBook = () => {
   return axios.get('/book')
}

//  删除
export  let bookDelete = (id) => {
   return axios.delete(`/book?id=${id}`)
}

//  单请求一条
export  let getData = (id) => {
   return axios.get(`/book?id=${id}`)
}

//   单次请求并发送修改数据
export  let getPut = (id,data) => {
   return axios.put(`/book?id=${id}`,data)
}

//   请求添加数据
export  let getAdd = (data) => {
  return axios.post('/book',data)
}


//  同时请求
export let getAll = ()=>{
  return axios.all([getSliders(),getHot()])
}

export let getMore = (offset)=>{
  return axios.get(`/page?offset=${offset}`)
}
